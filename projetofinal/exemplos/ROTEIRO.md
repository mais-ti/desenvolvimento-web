# Roteiro de prática — Backend com banco.db

O objetivo é acompanhar o caminho **HTML → requisição HTTP → backend → SQLite → resposta → interface**, usando o arquivo `projetofinal/banco/banco.db` já fornecido.

A [estrutura das tabelas](../README.md#estrutura-das-tabelas-fornecidas) está no README principal. O [catálogo de exemplos](README.md) indica qual arquivo estudar em cada etapa.

## 1. Preparar o ambiente e identificar o banco

Use Node.js 24 ou superior. Partindo da pasta `projetofinal`, confira:

```powershell
node --version
npm --version
Get-Item banco/banco.db
```

O arquivo precisa existir e conter as tabelas `produtos`, `clientes`, `pedidos` e `itens_pedido`. Os exemplos não criam um banco vazio quando ele está ausente nem executam `CREATE TABLE` no arquivo fornecido.

Antes das atividades de escrita, pare os servidores com **Ctrl+C** e faça uma cópia do banco, ainda em `projetofinal`:

```powershell
$copiaBanco = Join-Path 'banco' ('banco-antes-da-pratica-' + (Get-Date -Format 'yyyyMMdd-HHmmssfff') + '.db')
Copy-Item -LiteralPath 'banco/banco.db' -Destination $copiaBanco
```

Os exemplos continuarão acessando `banco.db`; a cópia guarda o estado anterior. Para estudar sem mudar a pasta original, também é possível copiar o projeto completo e executar a prática nessa cópia.

Agora prepare os exemplos que utilizam Express:

```powershell
cd exemplos/backend
npm install
```

As próximas instruções de execução partem de `exemplos/backend`. Todos os servidores usam `127.0.0.1:3000`: execute um por vez e deixe o terminal aberto. `06-fs.js` é um programa de terminal, não um servidor.

## 2. Conhecer os campos e as regras

| Assunto | Como aparece no banco | O que observar |
|---|---|---|
| Identificador | `id INTEGER PRIMARY KEY AUTOINCREMENT` | O SQLite gera o id; não suponha que um id específico exista |
| Preço | `preco_centavos` e `preco_unitario_centavos` | `1000` significa R$ 10,00; calcule em centavos |
| Produto | Nome e categoria não vazios; preço não negativo | Os exemplos POST e PUT exigem esses três campos |
| Disponibilidade | `disponivel` igual a `0` ou `1` | A simulação de pedido aceita apenas produtos disponíveis |
| Cliente | CPF único de 11 dígitos, nome e telefone obrigatórios | A restrição do CPF verifica formato, sem calcular dígitos verificadores |
| Atendimento | `local`, `retirada` ou `entrega` | Entrega exige endereço não vazio |
| Situação | `recebido`, `em_preparo`, `pronto`, `concluido`, `cancelado` | Cancelado deve ter `pago = 0` |
| Item | Quantidade positiva e preço unitário não negativo | O mesmo produto aparece uma vez por pedido, com sua quantidade |
| Relacionamento | `cliente_id`, `pedido_id`, `produto_id` | Os ids precisam apontar para registros existentes |

Os exemplos de consulta abrem o banco com `readOnly: true`. Os de CRUD abrem para escrita e ativam `PRAGMA foreign_keys = ON`. Não há mais um array substituindo os registros nem um banco alternativo na pasta dos exemplos.

## 3. Consultar com Express

```powershell
npm run express
```

Abra [a lista de produtos](http://127.0.0.1:3000/api/produtos). Observe os campos e compare com a tabela `produtos`. Recarregar a rota executa uma nova consulta ao banco.

Leia `01-express.js`: o caminho sobe duas pastas a partir de `exemplos/backend` e entra em `banco/banco.db`; `prepare` prepara o SQL, `all` lê as linhas e `res.json` envia os objetos ao navegador.

Abra também [01-html.html](http://127.0.0.1:3000/01-html.html). Os exemplos básicos de frontend 01 a 06 continuam usando dados locais para isolar HTML, CSS e JavaScript. A interface que consulta o banco é o exemplo 07. Com o servidor 01, ela pode carregar produtos, mas o cadastro exige o servidor 02 ou 03.

## 4. Cadastrar com Fetch e persistir no arquivo

Pare o servidor anterior e execute:

```powershell
npm run crud
```

Abra [07-fetch.html](http://127.0.0.1:3000/07-fetch.html) e:

1. Clique em **Carregar produtos**. A lista vem do banco fornecido.
2. Preencha nome, categoria e preço inteiro em centavos, por exemplo `1000`.
3. Clique em **Cadastrar**. A API executa um `INSERT` e devolve `201` com o registro criado.
4. Observe que a lista mostra o preço em reais, dividindo os centavos por 100 apenas para apresentação.
5. Pare e reinicie o servidor. Consulte novamente: o registro continua no arquivo.

Na aba **Rede/Network** do navegador (F12), observe o JSON enviado:

```json
{"nome":"Produto de estudo","categoria":"Lanches","preco_centavos":1000}
```

O banco gera o `id`, preenche `disponivel` com `1` e deixa os campos opcionais `descricao` e `imagem` nulos. Os exemplos não substituem os registros existentes.

## 5. Testar o CRUD completo

Com o servidor 02 ou 03 ativo, abra um segundo terminal PowerShell. As alterações abaixo atingem `banco/banco.db`; a exclusão usa somente o id do produto criado neste exercício.

```powershell
# READ: lista os produtos já existentes.
Invoke-RestMethod -Uri http://127.0.0.1:3000/api/produtos

# CREATE: cadastra os três campos exigidos e guarda o id recebido.
$produtoCriado = Invoke-RestMethod -Uri http://127.0.0.1:3000/api/produtos -Method Post -ContentType 'application/json' -Body '{"nome":"Produto de estudo","categoria":"Lanches","preco_centavos":1000}'
$produtoCriado

# UPDATE: altera nome, categoria e preço desse registro; preserva os demais campos.
Invoke-RestMethod -Uri "http://127.0.0.1:3000/api/produtos/$($produtoCriado.id)" -Method Put -ContentType 'application/json' -Body '{"nome":"Produto atualizado","categoria":"Lanches","preco_centavos":1200}'

# DELETE: remove somente o produto recém-criado. O sucesso 204 não tem corpo.
Invoke-RestMethod -Uri "http://127.0.0.1:3000/api/produtos/$($produtoCriado.id)" -Method Delete

# READ: confirma o resultado.
Invoke-RestMethod -Uri http://127.0.0.1:3000/api/produtos
```

| Requisição | Resposta esperada |
|---|---|
| `GET /api/produtos` | `200`, array com os registros do banco |
| `POST /api/produtos` com os três campos válidos | `201`, registro criado com id e valores padrão |
| `PUT /api/produtos/:id` com os três campos válidos | `200`, registro atualizado |
| `DELETE /api/produtos/:id` de produto sem vínculo | `204`, sem corpo |
| Nome/categoria vazios, preço ausente, negativo ou não inteiro | `400`, explicação em JSON |
| Id de atualização/exclusão inválido | `400` |
| Id positivo inexistente | `404` |
| Exclusão de produto referenciado em `itens_pedido` | `409`, registro preservado |

Um produto usado em um pedido não pode ser apagado por causa de `ON DELETE RESTRICT`. Os exemplos retornam `409` para explicar esse vínculo. Não exclua pedidos para contornar essa regra durante o exercício.

Pare o servidor 02 e execute `npm run sqlite`. Repita as consultas: os dois acessam o **mesmo arquivo**. O exemplo 03 deixa os comandos preparados no começo do código, para facilitar a leitura de `SELECT`, `INSERT`, `UPDATE` e `DELETE`. O nome antigo `02-crud-memoria.js` foi substituído por `02-crud.js`.

## 6. Comparar com o módulo HTTP

Pare o servidor anterior e execute:

```powershell
node 04-http.js
```

Abra [a página inicial](http://127.0.0.1:3000), [a saudação JSON](http://127.0.0.1:3000/api/ola) e [os produtos do banco](http://127.0.0.1:3000/api/produtos). Compare a última resposta com a do Express. O SQL consulta o mesmo arquivo; o que muda é a forma de receber a requisição e construir a resposta com `writeHead` e `end`.

## 7. Simular um pedido com formulário e querystring

Pare o servidor anterior e execute:

```powershell
node 05-querystring.js
```

Abra [o formulário](http://127.0.0.1:3000). O link **Consultar ids e preços dos produtos disponíveis** abre `/api/produtos` em outra aba. Escolha um id dessa lista e informe uma quantidade inteira positiva.

Ao clicar em **Simular pedido**, o navegador envia `POST /pedido` como `application/x-www-form-urlencoded`, por exemplo `produto_id=1&quantidade=2`. O id é ilustrativo: use um que exista no seu banco. O servidor:

1. Reúne os pedaços do corpo recebidos pelo módulo `http`.
2. Usa `querystring.parse` para obter os campos e os converte em números.
3. Consulta `produtos` com o id e `disponivel = 1`.
4. Calcula `total_centavos = preco_centavos * quantidade` com o preço do banco.
5. Responde com `produto_id`, `produto`, `quantidade`, `preco_unitario_centavos` e `total_centavos`.

Se o produto não existir ou estiver indisponível, a resposta é `404`; ids ou quantidades inválidos recebem `400`. Use **Voltar** no navegador para preencher outra simulação.

Esta etapa consulta o banco, mas **não grava em `pedidos` nem em `itens_pedido`**. Para implementar um pedido persistido no projeto, será necessário informar um cliente existente e o tipo de atendimento, além do endereço quando for entrega, e gravar o pedido e seus itens em uma transação. Essa implementação fica a cargo do escopo definido para a aplicação; o exemplo atual se limita à consulta e ao cálculo.

## 8. Inspecionar o arquivo com fs

```powershell
node 06-fs.js
```

Observe no terminal o caminho, o tamanho em bytes e a lista de produtos. `fs.stat` consulta os metadados do arquivo; depois, `node:sqlite` interpreta as tabelas. `fs` não substitui o SQLite: `banco.db` é um arquivo binário, e lê-lo como texto UTF-8 não devolve registros SQL.

O exemplo abre em modo de leitura, fecha a conexão no final e não cria mais `mensagem-exemplo.txt`.

## 9. Explorar os relacionamentos com SQL

As consultas abaixo podem ser estudadas em um editor SQLite conectado à cópia do banco. `JOIN` relaciona os registros pelos ids; a soma usa o preço gravado em cada item, preservando o valor histórico do pedido.

```sql
-- Ver os itens de cada pedido e calcular os subtotais em centavos.
SELECT i.pedido_id, p.nome, i.quantidade, i.preco_unitario_centavos,
       i.quantidade * i.preco_unitario_centavos AS subtotal_centavos
FROM itens_pedido AS i
JOIN produtos AS p ON p.id = i.produto_id
ORDER BY i.pedido_id, i.id;

-- Somar o total de cada pedido, incluindo pedidos ainda sem itens.
SELECT p.id, p.tipo, p.status, p.pago,
       COALESCE(SUM(i.quantidade * i.preco_unitario_centavos), 0) AS total_centavos
FROM pedidos AS p
LEFT JOIN itens_pedido AS i ON i.pedido_id = p.id
GROUP BY p.id, p.tipo, p.status, p.pago
ORDER BY p.id;
```

Explique por que o pedido guarda o preço unitário no item, por que uma exclusão pode retornar `409` e por que o formulário de simulação não basta para gravar um pedido completo.

## 10. Conferir o aprendizado

- Identificar o caminho e as quatro tabelas do banco.
- Diferenciar dados locais do frontend e dados consultados pelo backend.
- Explicar os métodos HTTP e os formatos JSON e formulário.
- Executar o CRUD com os campos reais e reconhecer os status de resposta.
- Verificar que os registros persistem depois de reiniciar o servidor.
- Simular um total a partir do preço consultado no banco.
- Explicar os relacionamentos, as restrições e o armazenamento de valores em centavos.

Se aparecer **banco não encontrado**, confira a estrutura de pastas. Se aparecer **no such table**, o arquivo não corresponde ao banco fornecido. Se a porta estiver ocupada, pare a outra execução dos exemplos. React e Bootstrap precisam de internet para carregar suas CDNs; os exemplos nativos e as consultas ao SQLite funcionam localmente.
