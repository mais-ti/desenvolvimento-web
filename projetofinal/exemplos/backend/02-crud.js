// Execute: npm run crud. Use um servidor por vez (todos usam a porta 3000).
// CRUD: Create (POST), Read (GET), Update (PUT) e Delete (DELETE).
const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');
const app = express();

// Antes das rotas, transforma o corpo JSON recebido em req.body.
app.use(express.json());
// Entrega o HTML pela mesma origem da API, permitindo usar URLs relativas.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Todos os exemplos acessam o banco fornecido na pasta banco do projeto.
const caminhoBanco = path.join(__dirname, '..', '..', 'banco', 'banco.db');
if (!fs.existsSync(caminhoBanco)) {
  throw new Error('Banco não encontrado. Confira projetofinal/banco/banco.db.');
}
const banco = new DatabaseSync(caminhoBanco);
banco.exec('PRAGMA foreign_keys = ON'); // Faz respeitar os relacionamentos das tabelas.

// O esquema real exige estes três campos. Reutilizamos a validação no POST e PUT.
function lerProduto(dados) {
  if (typeof dados?.nome !== 'string' || !dados.nome.trim() ||
      typeof dados.categoria !== 'string' || !dados.categoria.trim() ||
      !Number.isSafeInteger(dados.preco_centavos) || dados.preco_centavos < 0) {
    return null;
  }
  return { nome: dados.nome.trim(), categoria: dados.categoria.trim(), preco_centavos: dados.preco_centavos };
}

app.get('/api/produtos', function (req, res) {
  // READ: consulta o arquivo novamente, em vez de usar um array simulado.
  res.json(banco.prepare('SELECT * FROM produtos ORDER BY id').all());
});

app.post('/api/produtos', function (req, res) {
  const produto = lerProduto(req.body);
  if (!produto) {
    return res.status(400).json({ erro: 'Informe nome, categoria e preço inteiro em centavos (zero ou mais).' });
  }
  // CREATE: os ? recebem os dados na ordem, sem concatenar os valores ao SQL.
  const resultado = banco.prepare('INSERT INTO produtos (nome, categoria, preco_centavos) VALUES (?, ?, ?)')
    .run(produto.nome, produto.categoria, produto.preco_centavos);
  const id = Number(resultado.lastInsertRowid); // Id gerado pelo SQLite.
  res.status(201).json(banco.prepare('SELECT * FROM produtos WHERE id = ?').get(id));
});

// :id é um parâmetro da rota. Em /api/produtos/1, req.params.id vale '1'.
app.put('/api/produtos/:id', function (req, res) {
  const id = Number(req.params.id); // O parâmetro chega como texto.
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ erro: 'Informe um id inteiro positivo.' });
  }
  const produto = banco.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  const dados = lerProduto(req.body);
  if (!dados) {
    return res.status(400).json({ erro: 'Informe nome, categoria e preço inteiro em centavos (zero ou mais).' });
  }
  // UPDATE altera estes três campos; descrição, imagem e disponibilidade são preservadas.
  banco.prepare('UPDATE produtos SET nome = ?, categoria = ?, preco_centavos = ? WHERE id = ?')
    .run(dados.nome, dados.categoria, dados.preco_centavos, id);
  res.json(banco.prepare('SELECT * FROM produtos WHERE id = ?').get(id));
});

app.delete('/api/produtos/:id', function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ erro: 'Informe um id inteiro positivo.' });
  }
  const produto = banco.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  try {
    banco.prepare('DELETE FROM produtos WHERE id = ?').run(id); // DELETE no arquivo real.
  } catch (erro) {
    // O banco impede excluir produtos citados em itens_pedido (chave estrangeira).
    if (erro.message.includes('FOREIGN KEY constraint failed')) {
      return res.status(409).json({ erro: 'Este produto está vinculado a um pedido e não pode ser excluído.' });
    }
    throw erro; // Outros erros seguem para o tratamento padrão do Express.
  }
  res.status(204).end(); // 204 indica sucesso sem corpo de resposta.
});

app.listen(3000, '127.0.0.1', function () {
  console.log('Abra http://127.0.0.1:3000/07-fetch.html');
  console.log('Dados em banco/banco.db. Para parar, pressione Ctrl+C.');
});
