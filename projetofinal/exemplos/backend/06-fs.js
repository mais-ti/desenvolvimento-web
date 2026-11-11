// Execute: node 06-fs.js (ou npm run arquivos). Este exemplo roda só no terminal.
const fs = require('fs'); // Consulta informações do arquivo no sistema de arquivos.
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite'); // Interpreta as tabelas do arquivo SQLite.

// __dirname torna o caminho independente do diretório em que abrimos o terminal.
const arquivo = path.join(__dirname, '..', '..', 'banco', 'banco.db');

// stat é assíncrono: o callback recebe o erro ou as informações do arquivo.
fs.stat(arquivo, function (erro, informacoes) {
  if (erro) {
    console.error('Não foi possível acessar banco/banco.db:', erro.message);
    process.exitCode = 1; // Indica ao terminal que a execução teve uma falha.
    return;
  }
  console.log('Arquivo:', arquivo);
  console.log('Tamanho em bytes:', informacoes.size);

  // SQLite é binário: ler com fs.readFile(..., 'utf8') não produz linhas de uma tabela.
  // Usamos fs para os metadados e SQLite para consultar os registros corretamente.
  try {
    const banco = new DatabaseSync(arquivo, { readOnly: true });
    try {
      const produtos = banco.prepare('SELECT id, nome, categoria, preco_centavos FROM produtos ORDER BY id').all();
      console.table(produtos);
    } finally {
      banco.close(); // Libera a conexão mesmo se a consulta falhar.
    }
  } catch (erroBanco) {
    console.error('Não foi possível consultar o banco:', erroBanco.message);
    process.exitCode = 1;
  }
  // Não gravamos texto nem alteramos o banco. O processo termina após o callback.
});
