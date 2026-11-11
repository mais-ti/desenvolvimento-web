// Execute neste diretório: npm install, depois npm run express.
// O Node executa este arquivo no servidor; ele não roda dentro do navegador.

// require carrega o Express instalado localmente e o módulo de caminhos do Node.
const express = require('express');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const app = express(); // Cria a aplicação que receberá as requisições HTTP.

// Dois '..' sobem de exemplos/backend até projetofinal, onde está a pasta banco.
// readOnly abre o banco existente para consulta, sem criar nem modificar registros.
const caminhoBanco = path.join(__dirname, '..', '..', 'banco', 'banco.db');
const banco = new DatabaseSync(caminhoBanco, { readOnly: true });

app.get('/api/produtos', function (req, res) {
  // all executa o SELECT e devolve as linhas reais do banco como objetos.
  const produtos = banco.prepare('SELECT * FROM produtos ORDER BY id').all();
  res.json(produtos);
});

// GET é o método para consultar. '/api/ola' é o caminho (rota) da consulta.
app.get('/api/ola', function (req, res) {
  // req contém a requisição. res permite responder ao navegador.
  res.json({ mensagem: 'Olá, Esquina do Sabor!' }); // Objeto vira JSON.
});

// Middleware é uma função que participa do tratamento das requisições.
// static entrega os HTMLs do frontend. __dirname é a pasta deste arquivo.
// '..' sobe para exemplos; 'frontend' entra na pasta dos exemplos de interface.
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// listen inicia o servidor. A porta identifica onde receber as conexões.
// O endereço 127.0.0.1 limita o exemplo ao próprio computador.
app.listen(3000, '127.0.0.1', function () {
  console.log('API: http://127.0.0.1:3000/api/ola');
  console.log('Banco: http://127.0.0.1:3000/api/produtos');
  console.log('HTML: http://127.0.0.1:3000/01-html.html');
  console.log('Para parar, pressione Ctrl+C neste terminal.');
});
