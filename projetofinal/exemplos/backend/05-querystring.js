// Execute: node 05-querystring.js (ou npm run querystring).
// Importa os módulos essenciais do Node.js. Os três já vêm com o Node.
const http = require('http'); // Recebe requisições e envia respostas HTTP.
const querystring = require('querystring'); // Converte campos de formulário em objeto.
const fs = require('fs'); // Permite ler o HTML que está em outro arquivo.
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

// A simulação consulta produtos reais, mas abre o banco somente para leitura.
const banco = new DatabaseSync(path.join(__dirname, '..', '..', 'banco', 'banco.db'), { readOnly: true });

const servidor = http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    // __dirname é a pasta deste JS. /../ sobe até exemplos e entra no frontend.
    // readFile é assíncrono: a função abaixo roda quando a leitura terminar.
    fs.readFile(__dirname + '/../frontend/08-formulario-post.html', 'utf8', function (erro, html) {
      if (erro) { // Se o arquivo não puder ser lido, respondemos com erro do servidor.
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Não foi possível ler o formulário.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html); // O navegador interpreta o texto recebido como uma página HTML.
    });
    return; // A leitura responderá depois; não seguimos para a resposta 404.
  }

  if (req.method === 'GET' && req.url === '/api/produtos') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(banco.prepare('SELECT * FROM produtos WHERE disponivel = 1 ORDER BY id').all()));
    return;
  }

  if (req.method === 'POST' && req.url === '/pedido') {
    // O corpo pode chegar em vários pedaços. Vamos juntá-los antes de interpretar.
    let corpo = '';
    req.setEncoding('utf8'); // Recebe texto e preserva caracteres como ç e ã.
    req.on('data', function (pedaco) {
      corpo = corpo + pedaco;
    });

    req.on('end', function () {
      // Um formulário envia algo como: produto_id=1&quantidade=2.
      // parse converte esse texto em um objeto e decodifica os espaços e acentos.
      // Isto é application/x-www-form-urlencoded, diferente de um corpo JSON.
      const dados = querystring.parse(corpo);
      const produtoId = typeof dados.produto_id === 'string' ? Number(dados.produto_id) : NaN;
      // Os valores do formulário são textos; convertemos a quantidade em número.
      const quantidade = typeof dados.quantidade === 'string' ? Number(dados.quantidade) : NaN;

      // Também validamos no servidor, pois uma requisição pode vir sem o HTML.
      if (!Number.isSafeInteger(produtoId) || produtoId < 1 || !Number.isSafeInteger(quantidade) || quantidade < 1) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ erro: 'Informe um id de produto e uma quantidade inteira positiva.' }));
        return;
      }

      // O ? recebe o id. get devolve um produto, ou undefined se ele não existir.
      const produto = banco.prepare('SELECT * FROM produtos WHERE id = ? AND disponivel = 1').get(produtoId);
      if (!produto) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ erro: 'Produto não encontrado ou indisponível.' }));
        return;
      }
      const total = produto.preco_centavos * quantidade;
      if (!Number.isSafeInteger(total)) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ erro: 'Quantidade muito grande para calcular o total.' }));
        return;
      }
      // A simulação usa o preço do banco, sem confiar em um preço vindo do formulário.
      // Não gravamos pedidos: o esquema também exige cliente_id e tipo de atendimento.
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ produto_id: produto.id, produto: produto.nome, quantidade: quantidade,
        preco_unitario_centavos: produto.preco_centavos, total_centavos: total }));
    });
    return; // Esperamos os eventos data/end, sem responder 404 enquanto isso.
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada.');
});

servidor.listen(3000, '127.0.0.1', function () {
  console.log('Formulário: http://127.0.0.1:3000');
  console.log('Para parar, pressione Ctrl+C.');
});
