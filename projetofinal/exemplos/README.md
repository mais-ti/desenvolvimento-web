# Exemplos simples — Esquina do Sabor

Estude um arquivo por vez. Os comentários explicam a sequência do código, da configuração inicial até o resultado. O HTML contém somente os elementos necessários para demonstrar cada assunto.

Todos os exemplos de backend acessam o arquivo **`../banco/banco.db`**, relativo a esta pasta `exemplos`. O caminho é calculado a partir de cada arquivo JavaScript, independentemente da pasta em que o terminal foi aberto. A estrutura das quatro tabelas está no [README principal](../README.md#estrutura-das-tabelas-fornecidas).

O passo a passo, as requisições, os resultados esperados e os exercícios estão no [ROTEIRO.md](ROTEIRO.md).

## Organização e ordem sugerida

| Arquivo | O que estudar | Resultado esperado |
|---|---|---|
| [frontend/01-html.html](frontend/01-html.html) | Títulos, parágrafos, listas e links | Cardápio com dois itens fixos para estudar HTML |
| [frontend/02-css.html](frontend/02-css.html) | Seletores, classe, cor, borda e espaçamento | Produto com borda e preço verde |
| [frontend/03-javascript-formulario.html](frontend/03-javascript-formulario.html) | Formulário, evento, DOM e cálculo | Três pastéis totalizam R$ 30,00 no exemplo local |
| [frontend/04-lista-e-json.html](frontend/04-lista-e-json.html) | Array, objeto, repetição, DOM e JSON | Lista local criada pelo JavaScript |
| [frontend/05-bootstrap.html](frontend/05-bootstrap.html) | Classes CSS e componente interativo | Cartão com botão que mostra e esconde ingredientes |
| [frontend/06-react.html](frontend/06-react.html) | Componente, elemento, estado e clique | Contador atualizado a cada clique |
| [backend/01-express.js](backend/01-express.js) | Express, rota GET e consulta SQLite | `/api/produtos` lista o cardápio do banco em modo de leitura |
| [frontend/07-fetch.html](frontend/07-fetch.html) | GET, POST, async/await, JSON e centavos | Consultar produtos e cadastrar nome, categoria e preço usando o backend 02 ou 03 |
| [backend/02-crud.js](backend/02-crud.js) | Rotas, parâmetros, SQL e status HTTP | CRUD persistido em `banco/banco.db` |
| [backend/03-sqlite.js](backend/03-sqlite.js) | Comandos SQL preparados e relacionamentos | O mesmo CRUD, com os comandos preparados antes das requisições |
| [backend/04-http.js](backend/04-http.js) | Servidor HTTP, método, caminho e cabeçalhos | Consultar produtos do banco sem Express |
| [frontend/08-formulario-post.html](frontend/08-formulario-post.html) | Formulário, action, method e name | Enviar id do produto e quantidade ao backend 05 |
| [backend/05-querystring.js](backend/05-querystring.js) | http, querystring, fs e SQLite | Consultar um produto disponível e simular seu total com o preço do banco |
| [backend/06-fs.js](backend/06-fs.js) | Metadados de arquivo, callback e consulta SQLite | Ver o tamanho de `banco.db` e os produtos no terminal, sem gravar dados |

O exemplo `02-crud-memoria.js` foi renomeado para `02-crud.js`: suas operações agora são feitas no banco. Reiniciar os exemplos 02 e 03 mantém os registros gravados.

Cada `.html` mantém seu CSS ou JavaScript no próprio arquivo para facilitar a primeira leitura. No projeto principal, esses conteúdos poderão ser separados em arquivos `.css` e `.js`. Bootstrap e React continuam opcionais; seus exemplos precisam de internet para carregar as CDNs.

## Início rápido

Use Node.js **24 ou superior** e npm. Partindo de `projetofinal`:

```powershell
cd exemplos/backend
npm install
npm run express
```

Abra [o primeiro HTML](http://127.0.0.1:3000/01-html.html) e [a consulta de produtos](http://127.0.0.1:3000/api/produtos). Para praticar cadastro, pare com **Ctrl+C**, execute `npm run crud` e abra [07-fetch.html](http://127.0.0.1:3000/07-fetch.html).

| Comando em `exemplos/backend` | Banco | Interface |
|---|---|---|
| `npm run express` | Somente leitura | HTMLs 01 a 07; `/api/produtos` para consulta |
| `npm run crud` | Leitura e escrita em produtos | `/07-fetch.html` |
| `npm run sqlite` | Leitura e escrita em produtos | `/07-fetch.html` |
| `node 04-http.js` ou `npm run http` | Somente leitura | `/` e `/api/produtos` |
| `node 05-querystring.js` ou `npm run querystring` | Somente leitura | `/` exibe o formulário 08; `/api/produtos` lista os disponíveis |
| `node 06-fs.js` ou `npm run arquivos` | Somente leitura | Saída no terminal; não inicia servidor |

Execute um servidor por vez: todos usam a porta 3000. Os exemplos 04, 05 e 06 usam apenas módulos do Node e dispensam `npm install`. Os exemplos 01 a 03 precisam do Express instalado localmente.

**Os cadastros, alterações e exclusões dos exemplos 02 e 03 modificam o banco fornecido.** Faça a cópia descrita no roteiro antes da prática. Nenhum exemplo cria bancos alternativos nem recria tabelas. Se o arquivo estiver ausente, a execução informa um erro.

## Documentação de apoio

- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) e [Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch).
- [Bootstrap: início e CDN](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
- [React: createElement sem JSX](https://react.dev/reference/react/createElement) e [createRoot](https://react.dev/reference/react-dom/client/createRoot).
- [Express: arquivos estáticos](https://expressjs.com/en/starter/static-files.html) e [roteamento](https://expressjs.com/en/guide/routing.html).
- [Node.js: SQLite](https://nodejs.org/api/sqlite.html), [HTTP](https://nodejs.org/api/http.html), [querystring](https://nodejs.org/api/querystring.html) e [sistema de arquivos](https://nodejs.org/api/fs.html).
