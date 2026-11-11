// Execute: npm run sqlite. Este exemplo usa Node.js 24 ou superior.
// Mantemos as rotas do exemplo 02 e preparamos os comandos SQL antes de usá-los.
const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite'); // SQLite já incluído no Node.
const app = express();
app.use(express.json()); // Converte o corpo JSON em req.body.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Abrimos o banco fornecido. Não recriamos tabelas nem inserimos dados iniciais.
const caminhoBanco = path.join(__dirname, '..', '..', 'banco', 'banco.db');
if (!fs.existsSync(caminhoBanco)) {
  throw new Error('Banco não encontrado. Confira projetofinal/banco/banco.db.');
}
const banco = new DatabaseSync(caminhoBanco);
banco.exec('PRAGMA foreign_keys = ON'); // Ativa a verificação dos relacionamentos.

// prepare analisa o SQL uma vez. Os ? recebem os valores em cada chamada de run/get.
const listar = banco.prepare('SELECT * FROM produtos ORDER BY id');
const buscar = banco.prepare('SELECT * FROM produtos WHERE id = ?');
const inserir = banco.prepare('INSERT INTO produtos (nome, categoria, preco_centavos) VALUES (?, ?, ?)');
const atualizar = banco.prepare('UPDATE produtos SET nome = ?, categoria = ?, preco_centavos = ? WHERE id = ?');
const excluir = banco.prepare('DELETE FROM produtos WHERE id = ?');

// O banco exige nome, categoria e preço. 1000 centavos representam R$ 10,00.
function lerProduto(dados) {
  if (typeof dados?.nome !== 'string' || !dados.nome.trim() ||
      typeof dados.categoria !== 'string' || !dados.categoria.trim() ||
      !Number.isSafeInteger(dados.preco_centavos) || dados.preco_centavos < 0) {
    return null;
  }
  return { nome: dados.nome.trim(), categoria: dados.categoria.trim(), preco_centavos: dados.preco_centavos };
}

app.get('/api/produtos', function (req, res) {
  // SELECT lê registros. all devolve todas as linhas como um array de objetos.
  const produtos = listar.all();
  res.json(produtos); // O navegador recebe o mesmo formato usado no exemplo 02.
});

app.post('/api/produtos', function (req, res) {
  const produto = lerProduto(req.body);
  if (!produto) {
    return res.status(400).json({ erro: 'Informe nome, categoria e preço inteiro em centavos (zero ou mais).' });
  }
  // prepare prepara o comando. O ? recebe o valor passado ao run.
  // Assim o valor é tratado como dado, sem montar SQL concatenando o nome.
  const resultado = inserir.run(produto.nome, produto.categoria, produto.preco_centavos);
  // lastInsertRowid é o id gerado. Number o converte em número para o JSON.
  res.status(201).json(buscar.get(Number(resultado.lastInsertRowid)));
});

app.put('/api/produtos/:id', function (req, res) {
  const id = Number(req.params.id); // Converte o parâmetro da URL em número.
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ erro: 'Informe um id inteiro positivo.' });
  }
  if (!buscar.get(id)) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  const produto = lerProduto(req.body);
  if (!produto) {
    return res.status(400).json({ erro: 'Informe nome, categoria e preço inteiro em centavos (zero ou mais).' });
  }
  // O WHERE limita a alteração ao id; os outros campos da tabela são preservados.
  atualizar.run(produto.nome, produto.categoria, produto.preco_centavos, id);
  res.json(buscar.get(id));
});

app.delete('/api/produtos/:id', function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ erro: 'Informe um id inteiro positivo.' });
  }
  // DELETE remove só o registro indicado. changes informa quantas linhas saíram.
  try {
    const resultado = excluir.run(id);
    if (resultado.changes === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
  } catch (erro) {
    if (erro.message.includes('FOREIGN KEY constraint failed')) {
      // FOREIGN KEY: o produto faz parte de um pedido e a exclusão foi bloqueada.
      return res.status(409).json({ erro: 'Este produto está vinculado a um pedido e não pode ser excluído.' });
    }
    throw erro;
  }
  res.status(204).end(); // A resposta de exclusão não precisa de JSON.
});

app.listen(3000, '127.0.0.1', function () {
  console.log('Abra http://127.0.0.1:3000/07-fetch.html');
  console.log('Dados em banco/banco.db. Para parar, pressione Ctrl+C.');
});
