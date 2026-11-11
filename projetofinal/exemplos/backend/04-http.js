// Execute neste diretório: node 04-http.js (ou npm run http).
// http é um módulo do próprio Node.js: não é necessário instalar pelo npm.
const http = require('http');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

// O módulo HTTP recebe as requisições; SQLite consulta o banco existente.
const banco = new DatabaseSync(path.join(__dirname, '..', '..', 'banco', 'banco.db'), { readOnly: true });

// createServer cria um servidor. Esta função será chamada a cada requisição.
const servidor = http.createServer(function (req, res) {
  // req.method informa o método HTTP; req.url informa o caminho solicitado.
  if (req.method === 'GET' && req.url === '/') {
    // writeHead define o status e o formato. UTF-8 permite exibir os acentos.
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Olá, Esquina do Sabor! Acesse /api/produtos para consultar banco/banco.db.');
    return; // A resposta terminou; não devemos executar as outras condições.
  }

  if (req.method === 'GET' && req.url === '/api/ola') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // Diferente de res.json do Express, res.end precisa receber o JSON em texto.
    res.end(JSON.stringify({ mensagem: 'Olá pelo módulo http!' }));
    return;
  }

  if (req.method === 'GET' && req.url === '/api/produtos') {
    // A lista vem do arquivo SQLite, e não de um array fixo no código.
    const produtos = banco.prepare('SELECT * FROM produtos ORDER BY id').all();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(produtos));
    return;
  }

  // Se nenhuma rota acima respondeu, devolvemos 404 (caminho não encontrado).
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada.');
});

// listen começa a receber conexões. O endereço limita o acesso ao computador local.
servidor.listen(3000, '127.0.0.1', function () {
  console.log('Abra http://127.0.0.1:3000');
  console.log('JSON: http://127.0.0.1:3000/api/ola');
  console.log('Banco: http://127.0.0.1:3000/api/produtos');
  console.log('Para parar, pressione Ctrl+C.');
});
