# Projeto Final +TI

## Esquina do Sabor — Desenvolvimento de Aplicação Web

**Versão 1.1**

#### Atualização da versão 1.1

- Inclusão do **Express.js** como framework do backend, executado com Node.js, para definir rotas e tratar requisições e respostas HTTP.

### 1. Apresentação do projeto

Chegou o momento de colocar em prática os conhecimentos adquiridos durante as aulas do +TI!

Ao longo do curso, estudamos conceitos e ferramentas relacionados ao desenvolvimento web, especialmente HTML, CSS e JavaScript, além de fundamentos de comunicação entre frontend e backend.

Agora, o desafio será utilizar esses conhecimentos para desenvolver uma aplicação web que solucione um problema apresentado por um cliente fictício.

O projeto se chama **Esquina do Sabor** e deverá simular uma situação real de desenvolvimento de software, desde o primeiro contato com o cliente até a entrega de uma aplicação funcional.

Mais do que escrever código, o objetivo é compreender como identificar necessidades, levantar requisitos, planejar uma solução, implementar funcionalidades e validar os resultados.

A complexidade técnica será propositalmente reduzida, permitindo que o foco permaneça nos conteúdos estudados e na compreensão do processo de desenvolvimento.

---

### 2. Conheça o cliente: Seu João

Seu João é proprietário de um pequeno restaurante chamado **Esquina do Sabor**, localizado em uma esquina movimentada da cidade.

Durante muitos anos, o restaurante funcionou de maneira tradicional: os clientes consultavam cardápios impressos, os pedidos eram anotados manualmente e os pagamentos eram realizados diretamente no estabelecimento.

Entretanto, com o passar do tempo, o restaurante começou a crescer.

Novos clientes passaram a frequentar o estabelecimento, os pedidos para entrega aumentaram e Seu João percebeu que sua maneira de trabalhar já não estava atendendo adequadamente às necessidades do negócio.

Entre os problemas enfrentados pelo restaurante estão:

- **Cardápios impressos:** frequentemente ficam molhados, danificados ou desatualizados.
- **Organização dos produtos:** a manutenção de preços, informações e itens disponíveis tornou-se mais complicada.
- **Pedidos de entrega:** o aumento da demanda dificultou o registro e a organização dos pedidos.
- **Alterações nos pedidos:** os clientes frequentemente desejam adicionar produtos, modificar quantidades ou retirar itens.
- **Cálculo das contas:** somar manualmente vários produtos e quantidades está consumindo tempo e provocando dificuldades no atendimento.
- **Diferentes formas de atendimento:** o restaurante precisa atender clientes que desejam consumir no local, retirar seus pedidos ou receber os produtos em casa.

Diante dessa situação, Seu João decidiu contratar os **Alunos do +TI** para desenvolver uma solução digital que facilite o funcionamento do restaurante.

Porém, existe um detalhe importante: Seu João não entende de programação.

Ele conhece o funcionamento do próprio negócio e sabe quais problemas precisa resolver, mas não sabe exatamente quais telas, funcionalidades ou tecnologias serão necessárias.

Será responsabilidade dos Alunos do +TI compreender essas necessidades e transformá-las em uma aplicação web funcional.

### 3. O desafio dos Alunos do +TI

Vocês serão responsáveis pelo desenvolvimento da aplicação web **Esquina do Sabor**.

Entretanto, assim como ocorre em situações profissionais, vocês não receberão todos os requisitos prontos.

A primeira etapa será conversar com o cliente para compreender o problema e descobrir o que realmente precisa ser desenvolvido.

Durante essa atividade, o professor representará Seu João.

Vocês poderão fazer perguntas, apresentar sugestões, esclarecer dúvidas e discutir possibilidades de implementação.

A partir dessa conversa, será necessário identificar:

1. Quem utilizará a aplicação.
2. Quais problemas precisam ser resolvidos.
3. Quais funcionalidades serão necessárias.
4. Quais informações deverão aparecer na interface.
5. Quais dados precisarão ser armazenados ou manipulados.
6. Como os usuários deverão realizar suas principais tarefas.
7. Quais funcionalidades são essenciais e quais poderão ficar para versões futuras.

**Atenção:** nem toda ideia apresentada durante a conversa precisará ser implementada. Também será necessário considerar o tempo disponível, os conhecimentos da turma e a viabilidade técnica das funcionalidades.

O objetivo é desenvolver uma solução simples, funcional e coerente com as necessidades identificadas.

---

### 4. Proposta da aplicação

A proposta inicial é desenvolver uma aplicação web para auxiliar o atendimento do restaurante Esquina do Sabor.

A interface será direcionada principalmente aos clientes, permitindo que consultem informações sobre os produtos e utilizem as funcionalidades definidas durante o levantamento de requisitos.

Como ponto de partida, Seu João espera conseguir disponibilizar seu cardápio digitalmente e facilitar a realização de pedidos.

Outras necessidades e detalhes do funcionamento deverão ser esclarecidos durante a conversa com ele.

O projeto deverá apresentar um fluxo de utilização compreensível, desde o acesso à aplicação até a conclusão das operações previstas no escopo.

Não será exigido um sistema comercial completo.

A prioridade será desenvolver uma aplicação que funcione corretamente e demonstre a utilização prática dos conhecimentos adquiridos durante o +TI.

### 5. Tecnologias e ferramentas

O desenvolvimento utilizará como base as tecnologias trabalhadas durante o curso.

| Tecnologia | Aplicação no projeto |
|---|---|
| HTML | Estruturação das páginas e dos elementos da interface |
| CSS | Estilização, organização visual e layout |
| JavaScript | Interatividade, manipulação do DOM, eventos, dados e cálculos |
| Node.js | Execução do código JavaScript no backend |
| Express.js | Framework do backend para definição de rotas e tratamento de requisições e respostas HTTP |
| API HTTP | Comunicação entre frontend e backend |
| CRUD | Operações básicas de criação, leitura, atualização e exclusão de dados |
| Roteamento | Organização dos caminhos utilizados para acessar páginas ou funcionalidades da API |
| SQLite | Banco de dados relacional local, armazenado em um arquivo `.bd` individual para cada aluno |
| SQL | Criação de tabelas e execução de consultas e operações CRUD no banco de dados |
| JSON | Formato de troca de dados entre frontend e backend, quando necessário |

O backend deverá utilizar **Node.js com Express.js**, em uma implementação simples, com rotas, operações CRUD e apenas as funcionalidades necessárias para atender ao escopo definido.

Não será necessário criar arquiteturas complexas, microsserviços ou múltiplas camadas de abstração.

A escolha de bibliotecas adicionais para o backend, caso necessárias, será orientada conforme o conteúdo trabalhado nas aulas.

#### 5.1 Ferramentas opcionais

Caso desejem explorar melhorias visuais e tenham domínio das tecnologias principais, poderão utilizar ferramentas adicionais, como Bootstrap e React.

**Bootstrap**

O Bootstrap é uma ferramenta que disponibiliza classes CSS, componentes visuais e recursos de layout que facilitam a construção de interfaces.

Entre os recursos disponíveis estão botões, cartões, barras de navegação, formulários, tabelas e sistemas de organização de elementos.

Documentação oficial:

https://getbootstrap.com/docs/5.3/getting-started/introduction/

**React**

O React é uma biblioteca JavaScript utilizada para construir interfaces baseadas em componentes reutilizáveis.

Pode ser interessante para estudantes que desejarem explorar outras formas de organizar e atualizar os elementos de uma página.

Documentação oficial (em português):

https://pt-br.react.dev/learn

**Importante:** o uso dessas ferramentas será opcional. React pode exigir configurações e adaptações na estrutura do frontend, que deverão ser discutidas antes da implementação.

Os conhecimentos fundamentais de HTML, CSS e JavaScript continuarão sendo a prioridade do projeto.

---

### 6. Estrutura do projeto

Para facilitar a organização e o acompanhamento do desenvolvimento, todos deverão utilizar a mesma estrutura inicial de diretórios e arquivos.

```text
projetofinal/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── pages/
│   │   └── menu.html
│   └── script.js
│
├── backend/
│   └── api.js
│
└── banco/
    ├── imagens/
    └── dados.bd
```

A aplicação será organizada em três partes: **frontend, backend e banco de dados**.

#### 6.1 Responsabilidade de cada elemento

| Arquivo ou diretório | Responsabilidade |
|---|---|
| `projetofinal/` | Diretório principal do projeto |
| `frontend/` | Organização dos arquivos relacionados à interface |
| `index.html` | Página inicial da aplicação |
| `css/` | Diretório dos arquivos de estilização |
| `styles.css` | Estilos visuais e organização do layout |
| `pages/` | Diretório para páginas adicionais |
| `menu.html` | Página destinada à apresentação do cardápio |
| `script.js` | Lógica e interatividade do frontend, incluindo comunicação com a API |
| `backend/` | Organização do código executado no servidor |
| `api.js` | Rotas, operações CRUD e funcionalidades básicas do backend |
| `banco/` | Diretório de armazenamento dos dados utilizados pela aplicação |
| `imagens/` | Armazenamento das imagens utilizadas no cardápio e em outros elementos |
| `dados.bd` | Banco de dados SQLite local e individual, que será implementado por cada aluno |

Essa será a estrutura inicial obrigatória.

Caso seja necessário adicionar arquivos ou páginas, a alteração deverá ser justificada pelas necessidades identificadas durante o desenvolvimento.

### 7. Funcionamento do frontend, backend e banco de dados

A aplicação será organizada em três partes que trabalharão em conjunto.

#### 7.1 Frontend — O que o cliente visualiza e utiliza

Será responsável por apresentar o conteúdo do site e permitir que os usuários interajam com a aplicação.

Nele serão implementados os elementos visuais, os controles de interação e os comportamentos executados no navegador.

#### 7.2 Backend — O que processa as operações da aplicação

Será responsável por receber requisições, executar as operações necessárias e retornar respostas ao frontend.

O arquivo `api.js` utilizará o Express.js e concentrará as funcionalidades básicas do servidor, incluindo:

- Definição de rotas HTTP.
- Recebimento de requisições.
- Leitura e tratamento de dados enviados pelo frontend.
- Execução de operações CRUD simples.
- Consulta e atualização das informações armazenadas no banco SQLite local (`dados.bd`).
- Retorno de respostas para a interface.

As operações CRUD representam quatro ações fundamentais:

| Operação | Significado | Exemplo de aplicação |
|---|---|---|
| Create | Criar | Registrar um novo pedido |
| Read | Ler | Consultar os produtos disponíveis |
| Update | Atualizar | Modificar informações de um pedido |
| Delete | Excluir | Remover um registro de pedido |

Esses exemplos são apenas ilustrativos. As operações que serão efetivamente utilizadas dependerão do escopo definido com Seu João.

#### 7.3 Banco de dados — Onde as informações serão armazenadas

O projeto contará com um **banco de dados SQLite local**, armazenado no arquivo `banco/dados.bd`.

**Cada aluno será responsável por implementar e utilizar seu próprio banco de dados**, de forma individual e independente dos bancos dos demais alunos. O arquivo `.bd` será armazenado localmente e conterá os registros necessários ao funcionamento de sua aplicação.

O SQLite é um sistema de banco de dados relacional que funciona diretamente em um arquivo, sem exigir a instalação ou configuração de um servidor de banco de dados separado. A extensão `.bd` será adotada como padrão neste projeto.

Conforme os requisitos definidos, os alunos poderão criar tabelas para armazenar informações relacionadas a produtos, categorias, preços e pedidos, utilizando SQL para consultar e modificar os registros.

O diretório `imagens/` armazenará os arquivos de imagem utilizados pelo projeto, enquanto o banco de dados poderá guardar as referências aos respectivos arquivos.

**Não será necessário utilizar servidores de banco de dados externos, como MySQL ou PostgreSQL.** O SQLite será a solução obrigatória para persistência local nesta atividade.

As operações de leitura, criação, atualização e exclusão deverão ser realizadas pelo backend, que se comunicará com o banco SQLite. O frontend não acessará diretamente o arquivo `.bd`.

O JSON poderá continuar sendo utilizado para transmitir informações entre frontend e backend por meio das requisições e respostas HTTP, mas **não será utilizado como arquivo de armazenamento persistente**.

A proposta é que os alunos compreendam como estruturar tabelas e como os dados podem ser armazenados, consultados e modificados em uma aplicação web.

#### 7.4 Comunicação entre as partes

O funcionamento básico poderá seguir este fluxo:

1. O usuário realiza uma ação na interface.
2. O JavaScript do frontend identifica a interação.
3. Quando necessário, o frontend envia uma requisição HTTP ao backend.
4. O backend identifica a rota e executa a operação correspondente.
5. Caso necessário, o backend consulta ou modifica os registros do banco SQLite local (`dados.bd`).
6. O backend retorna uma resposta.
7. O frontend utiliza a resposta para atualizar as informações apresentadas ao usuário.

Esse processo permitirá visualizar, na prática, como frontend, backend e armazenamento de dados se relacionam.

---

### 8. Simplificações e limites do projeto

O Esquina do Sabor é um projeto educacional. Por isso, serão adotadas algumas simplificações para tornar o desenvolvimento viável.

**Não teremos etapas de implementação de segurança da aplicação.**

Isso significa que não serão exigidas atividades específicas de autenticação, autorização, controle de permissões, criptografia ou mecanismos avançados de proteção de dados.

Também não serão exigidos:

- Integração com sistemas bancários.
- Processamento real de pagamentos.
- Infraestrutura em nuvem.
- Servidores externos de banco de dados, como MySQL ou PostgreSQL.
- Arquitetura de backend robusta.
- Sistemas completos de administração.
- Funcionalidades externas que não sejam necessárias ao escopo.

Caso a interface apresente um botão de login administrativo, sua implementação poderá ser considerada uma funcionalidade futura, sem fazer parte dos requisitos obrigatórios.

As operações relacionadas a pagamento, quando previstas no escopo, deverão ser simuladas, sem utilizar transações financeiras reais.

A aplicação deverá trabalhar com dados fictícios ou de demonstração e não será destinada ao uso em produção.

O foco será implementar corretamente as funcionalidades essenciais, utilizando código simples e compreensível.

### 9. Organização do desenvolvimento com GitHub

Além da implementação da aplicação, existe uma prática muito importante no desenvolvimento de software: o **versionamento de código**.

Embora não seja uma exigência obrigatória do projeto, é **bastante recomendado e será considerado um excelente diferencial** que os Alunos do +TI utilizem o GitHub para armazenar e acompanhar o desenvolvimento de suas aplicações.

O GitHub é uma plataforma que permite hospedar repositórios Git, compartilhar código e acompanhar o histórico de alterações realizadas em um projeto.

Site oficial:

https://github.com/

#### 9.1 Por que utilizar o GitHub?

**Preservação do trabalho**

Todo o esforço dedicado ao projeto poderá ficar armazenado em um repositório, permitindo que vocês consultem os arquivos mesmo depois do término das aulas.

**Histórico de desenvolvimento**

O versionamento permite acompanhar a evolução da aplicação, desde a estrutura inicial até a implementação das funcionalidades finais.

**Organização e recuperação**

Caso uma alteração cause problemas, o histórico de versões poderá ajudar a identificar o que mudou e recuperar versões anteriores.

**Trabalho colaborativo**

Quando o projeto for desenvolvido por mais de uma pessoa, o GitHub poderá facilitar o compartilhamento e a organização das contribuições.

**Portfólio profissional**

O repositório também poderá servir como registro dos conhecimentos adquiridos durante o +TI, permitindo demonstrar um projeto desenvolvido durante o curso.

#### 9.2 Recomendações de utilização

Caso optem pelo GitHub, recomenda-se:

1. Criar um repositório para o projeto Esquina do Sabor.
2. Adicionar a estrutura inicial de arquivos.
3. Registrar as alterações conforme as funcionalidades forem implementadas.
4. Utilizar mensagens de commit que descrevam as modificações realizadas.
5. Manter o repositório atualizado durante o desenvolvimento.
6. Ao final, adicionar uma descrição do projeto e orientações básicas para sua execução.

Como cada aluno utilizará seu próprio banco SQLite local (`dados.bd`), deverão ser armazenados apenas dados fictícios ou demonstrativos, sem senhas ou informações pessoais reais. Recomenda-se versionar o código e as instruções de criação do banco, evitando publicar o arquivo local com os dados da aplicação.

**Lembrem-se:** o projeto desenvolvido durante o +TI representa o conhecimento e o esforço de vocês.

Mesmo que futuramente aprendam novas tecnologias e desenvolvam aplicações mais avançadas, será interessante poder retornar ao Esquina do Sabor e observar o quanto evoluíram.

Guardar esse trabalho é também uma forma de preservar uma etapa importante da trajetória de aprendizagem de cada um.

---

### 10. Etapas de desenvolvimento

O projeto será conduzido progressivamente, com atividades que representem diferentes momentos do desenvolvimento de software.

| Etapa | Atividade | Objetivo |
|---|---|---|
| 1 | Apresentação do cliente | Conhecer o restaurante e seus problemas |
| 2 | Descoberta de requisitos | Conversar com Seu João e compreender suas necessidades |
| 3 | Definição do escopo | Selecionar as funcionalidades viáveis |
| 4 | Sketch da interface | Esboçar a organização das páginas e das interações |
| 5 | Estruturação do projeto | Criar os diretórios e arquivos necessários |
| 6 | Implementação do frontend | Desenvolver a estrutura visual e as interações |
| 7 | Implementação do backend | Criar rotas, operações CRUD e funcionalidades básicas |
| 8 | Organização do banco de dados | Criar individualmente o banco SQLite `dados.bd`, estruturar as tabelas e organizar os arquivos de imagem |
| 9 | Integração | Estabelecer a comunicação entre frontend, backend e banco |
| 10 | Testes | Verificar o funcionamento e corrigir problemas |
| 11 | Apresentação final | Demonstrar a solução e explicar seu funcionamento |

**Atividade recomendada durante todo o desenvolvimento:** utilizar o GitHub para registrar as versões do projeto e acompanhar sua evolução.

O desenvolvimento deverá priorizar a conclusão das funcionalidades essenciais antes da inclusão de melhorias adicionais.

### 11. Resultados esperados

Ao final do projeto, espera-se que os Alunos do +TI tenham desenvolvido uma aplicação web simples e funcional, capaz de atender aos requisitos definidos com o cliente.

Além da aplicação, deverão ser capazes de explicar:

- Qual problema foi apresentado por Seu João.
- Como ocorreu o levantamento de requisitos.
- Quais funcionalidades foram selecionadas.
- Como a interface foi organizada.
- Como HTML, CSS e JavaScript foram utilizados.
- Qual é a responsabilidade do frontend.
- Como o backend recebe e responde às requisições.
- Como foram implementadas as operações CRUD.
- Como o banco SQLite individual foi estruturado e como os dados são armazenados e consultados no arquivo `.bd`.
- Como ocorre a comunicação entre as partes da aplicação.
- Como as funcionalidades foram testadas.
- Quais dificuldades foram encontradas e como foram resolvidas.

A avaliação do projeto deverá considerar tanto o funcionamento da aplicação quanto a compreensão dos conceitos utilizados.

**Uma aplicação simples, bem estruturada e que funciona corretamente será mais importante do que uma interface visualmente elaborada com funcionalidades incompletas.**

### 12. Objetivos de aprendizagem

Ao concluir a atividade, vocês deverão ser capazes de:

1. Compreender as necessidades de um cliente a partir de um problema apresentado.
2. Participar de uma conversa de descoberta e levantamento de requisitos.
3. Definir um escopo de desenvolvimento coerente e viável.
4. Planejar a interface de uma aplicação web.
5. Aplicar HTML na estruturação de páginas.
6. Utilizar CSS para estilizar e organizar os elementos visuais.
7. Implementar comportamentos e interações com JavaScript.
8. Utilizar requisições HTTP para comunicação com uma API.
9. Compreender e implementar operações CRUD básicas.
10. Organizar o projeto separando frontend, backend e banco de dados.
11. Criar e utilizar um banco de dados SQLite local e individual, com arquivo `.bd` e operações SQL básicas.
12. Testar as principais funcionalidades desenvolvidas.
13. Compreender a importância do versionamento de código.
14. Apresentar e justificar as decisões de implementação.

---

### 13. Considerações finais

O Esquina do Sabor é uma oportunidade de vivenciar, de maneira simplificada, como um projeto de software surge de uma necessidade real.

Seu João não está procurando a aplicação mais sofisticada do mercado. Ele precisa de uma solução que resolva os problemas do restaurante de maneira prática.

Da mesma forma, o desafio dos Alunos do +TI não será utilizar a maior quantidade possível de tecnologias, mas compreender o problema, escolher o que realmente precisa ser desenvolvido e implementar uma solução funcional.

Durante o desenvolvimento, vocês terão a oportunidade de aplicar conhecimentos técnicos, exercitar o raciocínio lógico, solucionar problemas e experimentar algumas práticas utilizadas no desenvolvimento profissional de software.

Aqueles que optarem por utilizar o GitHub também poderão preservar o resultado desse trabalho e acompanhar sua própria evolução ao longo do tempo.

**O primeiro passo não será escrever código. Será conversar com Seu João.**

A partir dessa conversa, vocês definirão o que será construído e como os conhecimentos adquiridos durante o +TI poderão ser utilizados para transformar as necessidades do restaurante em uma aplicação web.

**Bom desenvolvimento, Alunos do +TI!**
