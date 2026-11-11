# Banco de dados — Esquina do Sabor

Esta pasta contém o banco de dados SQLite utilizado pelo projeto e pelos exemplos de backend.

```text
banco/
├── banco.db     # Arquivo SQLite com as tabelas e os registros
├── imagens/    # Arquivos de imagem utilizados pelo cardápio
└── readmd.md   # Explicação do banco e de suas tabelas
```

## Como o banco funciona

O SQLite armazena as tabelas e os registros em um arquivo local: **`banco.db`**. Não é necessário instalar um servidor de banco de dados separado.

O backend abre esse arquivo e utiliza SQL para consultar, cadastrar, atualizar ou excluir dados. O frontend recebe os resultados pela API; ele não abre o arquivo do banco diretamente.

`banco.db` é um arquivo binário. Ler seu conteúdo como texto com `fs.readFile(..., 'utf8')` não retorna as tabelas. Nos exemplos, o módulo `fs` consulta informações do arquivo, enquanto `node:sqlite` executa as consultas SQL.

Os arquivos de imagem ficam em `imagens/`. O campo `imagem` da tabela `produtos` guarda uma referência textual à imagem, e não o conteúdo binário dela.

## Visão geral das tabelas

| Tabela | Responsabilidade |
|---|---|
| `produtos` | Armazenar os itens do cardápio, seus preços e sua disponibilidade |
| `clientes` | Armazenar a identificação e o contato dos clientes |
| `pedidos` | Registrar o cliente, o tipo de atendimento e a situação do pedido |
| `itens_pedido` | Relacionar cada pedido aos produtos, quantidades e preços contratados |

## 1. Tabela produtos

Cada registro representa um produto do cardápio.

| Campo | Tipo SQL | Explicação e regras |
|---|---|---|
| `id` | `INTEGER` | Chave primária gerada automaticamente com `AUTOINCREMENT` |
| `nome` | `TEXT` | Obrigatório; não pode ser vazio nem conter apenas espaços |
| `descricao` | `TEXT` | Descrição opcional do produto; aceita `NULL` |
| `categoria` | `TEXT` | Obrigatória; não pode ser vazia nem conter apenas espaços |
| `preco_centavos` | `INTEGER` | Preço em centavos, obrigatório e não negativo |
| `imagem` | `TEXT` | Referência opcional à imagem; aceita `NULL` |
| `disponivel` | `INTEGER` | `1` para disponível e `0` para indisponível; obrigatório, com padrão `1` |

A categoria é um campo dessa tabela; não existe uma tabela separada de categorias no banco fornecido.

Os exemplos de cadastro exigem `nome`, `categoria` e `preco_centavos`. O SQLite gera o `id` e aplica o valor padrão de `disponivel`. Descrição e imagem podem ficar sem preenchimento.

## 2. Tabela clientes

Cada registro identifica um cliente, que pode estar associado a vários pedidos.

| Campo | Tipo SQL | Explicação e regras |
|---|---|---|
| `id` | `INTEGER` | Chave primária gerada automaticamente com `AUTOINCREMENT` |
| `cpf` | `TEXT` | Obrigatório e único; deve conter exatamente 11 dígitos, sem pontuação |
| `nome` | `TEXT` | Obrigatório; não pode ser vazio nem conter apenas espaços |
| `telefone` | `TEXT` | Obrigatório; não pode ser vazio nem conter apenas espaços |

O CPF é texto para preservar zeros à esquerda. A restrição existente verifica o tamanho e a presença de caracteres numéricos; ela **não calcula os dígitos verificadores** do CPF.

O telefone também é texto. O banco exige um valor não vazio, mas não estabelece uma máscara ou quantidade específica de dígitos para esse campo.

## 3. Tabela pedidos

Cada registro representa um pedido associado a um cliente. Os produtos desse pedido são registrados separadamente em `itens_pedido`.

| Campo | Tipo SQL | Explicação e regras |
|---|---|---|
| `id` | `INTEGER` | Chave primária gerada automaticamente com `AUTOINCREMENT` |
| `cliente_id` | `INTEGER` | Obrigatório; referencia `clientes.id` |
| `tipo` | `TEXT` | Obrigatório; aceita `local`, `retirada` ou `entrega` |
| `endereco` | `TEXT` | Aceita `NULL`, mas é obrigatório e não vazio quando `tipo = 'entrega'` |
| `status` | `TEXT` | Obrigatório; padrão `recebido`; valores permitidos na tabela abaixo |
| `criado_em` | `TEXT` | Obrigatório; preenchido automaticamente com `CURRENT_TIMESTAMP` quando omitido |
| `pago` | `INTEGER` | `1` para pago e `0` para não pago; obrigatório, com padrão `0` |

| Status permitido | Significado no contexto do projeto |
|---|---|
| `recebido` | Pedido registrado |
| `em_preparo` | Pedido em preparação |
| `pronto` | Preparação finalizada |
| `concluido` | Atendimento finalizado |
| `cancelado` | Pedido cancelado |

O banco limita os valores de status, mas não define uma sequência obrigatória de transições entre eles. Essa lógica pertence à aplicação, conforme o escopo definido.

Uma restrição impede manter um pedido cancelado com `pago = 1`. Para um pedido com `status = 'cancelado'`, o campo `pago` deve ser `0`. O pagamento neste projeto é simulado.

## 4. Tabela itens_pedido

Cada registro representa um produto dentro de um pedido, com a quantidade e o preço unitário usados naquele pedido.

| Campo | Tipo SQL | Explicação e regras |
|---|---|---|
| `id` | `INTEGER` | Chave primária gerada automaticamente com `AUTOINCREMENT` |
| `pedido_id` | `INTEGER` | Obrigatório; referencia `pedidos.id` |
| `produto_id` | `INTEGER` | Obrigatório; referencia `produtos.id` |
| `quantidade` | `INTEGER` | Obrigatória e maior que zero |
| `preco_unitario_centavos` | `INTEGER` | Preço unitário em centavos, obrigatório e não negativo |

O par **`pedido_id` + `produto_id` é único**. Um produto não pode aparecer em duas linhas do mesmo pedido; a quantidade deve ser reunida no mesmo item.

O preço é guardado no item para preservar o valor praticado no pedido. Alterar `produtos.preco_centavos` depois não altera automaticamente `itens_pedido.preco_unitario_centavos`.

## Relacionamentos e exclusões

| Relação | Como é representada | Regra ao excluir |
|---|---|---|
| Um cliente pode ter vários pedidos | `pedidos.cliente_id` → `clientes.id` | `RESTRICT`: impede excluir um cliente que tenha pedidos |
| Um pedido pode ter vários itens | `itens_pedido.pedido_id` → `pedidos.id` | `CASCADE`: excluir um pedido também exclui seus itens |
| Um produto pode aparecer em vários pedidos | `itens_pedido.produto_id` → `produtos.id` | `RESTRICT`: impede excluir um produto utilizado em algum item |

Nos exemplos de escrita, a conexão executa `PRAGMA foreign_keys = ON` para verificar essas chaves estrangeiras. Os exemplos de CRUD retornam HTTP `409` quando uma exclusão de produto é bloqueada por um vínculo com pedido.

A tabela **`sqlite_sequence`** também aparece ao inspecionar o arquivo. Ela é interna do SQLite e controla a sequência de ids das tabelas com `AUTOINCREMENT`; não representa uma entidade do restaurante.

## Valores em centavos e cálculo do total

Os preços são guardados em centavos. Por exemplo, `1000` representa R$ 10,00 e `1250` representa R$ 12,50. Divida por 100 somente ao apresentar o valor em reais.

O subtotal de um item é calculado assim:

```text
subtotal_centavos = quantidade × preco_unitario_centavos
```

O total do pedido é a soma dos subtotais. Não existe uma coluna de total na tabela `pedidos` fornecida.

## Consultas para estudar

As consultas abaixo apenas leem os dados.

```sql
-- Consultar os produtos disponíveis para o cardápio.
SELECT id, nome, categoria, preco_centavos
FROM produtos
WHERE disponivel = 1
ORDER BY nome;

-- Relacionar os itens aos produtos e calcular os subtotais.
SELECT i.pedido_id, p.nome, i.quantidade, i.preco_unitario_centavos,
       i.quantidade * i.preco_unitario_centavos AS subtotal_centavos
FROM itens_pedido AS i
JOIN produtos AS p ON p.id = i.produto_id
ORDER BY i.pedido_id, i.id;

-- Somar os itens de cada pedido; pedidos sem itens têm total zero.
SELECT p.id, p.tipo, p.status,
       COALESCE(SUM(i.quantidade * i.preco_unitario_centavos), 0) AS total_centavos
FROM pedidos AS p
LEFT JOIN itens_pedido AS i ON i.pedido_id = p.id
GROUP BY p.id, p.tipo, p.status
ORDER BY p.id;
```

## Uso nos exemplos e material complementar

Todos os exemplos de backend acessam este `banco.db`. Os exemplos 01, 04, 05 e 06 abrem o arquivo somente para leitura. Os exemplos 02 e 03 realizam CRUD em `produtos` e modificam os registros no arquivo.

A simulação de pedido do exemplo 05 consulta disponibilidade e preço, mas não insere em `pedidos` ou `itens_pedido`. Um pedido persistido também precisa de cliente, tipo de atendimento e, quando for entrega, endereço.

Antes de uma prática de escrita, faça uma cópia do arquivo com os servidores parados. O roteiro explica esse procedimento e apresenta os comandos de execução.

- [README principal: SQL de criação das tabelas](../README.md#estrutura-das-tabelas-fornecidas).
- [Catálogo de exemplos](../exemplos/README.md).
- [Roteiro de prática com banco.db](../exemplos/ROTEIRO.md).
