# Projeto Final (Web): Sistema de Passagens Aéreas

Nas últimas aulas, o sistema de passagens rodava no terminal e guardava tudo num banco SQLite. Agora vamos dar uma cara pra ele: HTML e CSS pra construir as telas, e JavaScript pra deixar tudo interativo.

A boa notícia é que a lógica do sistema — companhias, trechos, cupons, carrinho — vocês já entendem muito bem. O que muda aqui é o *onde* e o *como* essa lógica roda: em vez de `console.log` no terminal, vamos desenhar isso na tela; em vez de `prompt-sync` esperando o usuário digitar, vamos usar formulários e botões; e em vez do SQLite, vamos guardar os dados no `localStorage` do navegador.

## Por que localStorage e não o SQLite de novo?

O SQLite depende do Node.js rodando no computador — ele não funciona dentro do navegador. Pra manter o banco de verdade, precisaríamos de um servidor (Express, rotas, requisições assíncronas), o que é assunto pra mais pra frente. Por enquanto, o objetivo é focar em HTML, CSS e na manipulação do DOM com JavaScript.

O `localStorage` é uma API que todo navegador já tem pronta. Ele guarda dados no formato **texto**, então tudo que salvarmos ali (arrays, objetos) precisa ser convertido pra texto antes (`JSON.stringify`) e convertido de volta quando lermos (`JSON.parse`). Ele vai fazer, pra gente, o mesmo papel que o `database.js` fazia: é o lugar onde os dados moram de verdade, entre uma tela e outra.

**Obs.:** os dados ficam salvos no navegador de quem está usando o sistema. Se você abrir em outro navegador ou computador, os dados não aparecem — porque cada navegador tem o seu próprio `localStorage`.

## Objetivos de aprendizagem

Com este projeto, vocês vão praticar:
* Estruturar um site com várias páginas HTML que conversam entre si;
* Escrever um CSS único e organizado, aplicado a várias telas;
* Manipular o DOM com JavaScript (criar elementos, ler formulários, atualizar a tela);
* Persistir dados no navegador com `localStorage`;
* Validar formulários e dar feedback visual pro usuário sem usar `alert()`.

## Melhorias que vamos acrescentar

Em relação à versão do terminal, vamos incluir quatro pequenas melhorias, natural nesse ambiente web:

1. **Mensagens de feedback estilizadas** (sucesso/erro) em vez de `console.log` ou `alert()`;
2. **Confirmação antes de excluir** um trecho ou cupom, pra evitar cliques acidentais;
3. **Validação de formulário**: campos obrigatórios não podem ficar em branco;
4. **Aviso de "últimas vagas"**: quando um trecho tiver 2 passagens ou menos, ele ganha um destaque visual.

Nada além disso — o restante das funcionalidades é o que o sistema já tinha.

## Estrutura do projeto

Criem uma pasta chamada `sistema-passagens-web` com os seguintes arquivos:

```
sistema-passagens-web/
├── index.html
├── style.css
├── dados.js
├── companhia.html
├── companhia-cadastrar.html
├── companhia-cadastrar.js
├── companhia-listar.html
├── companhia-listar.js
├── companhia-trechos-cadastrar.html
├── companhia-trechos-cadastrar.js
├── companhia-trechos-listar.html
├── companhia-trechos-listar.js
├── companhia-cupons-cadastrar.html
├── companhia-cupons-cadastrar.js
├── companhia-cupons-listar.html
├── companhia-cupons-listar.js
├── cliente-trechos.html
├── cliente-trechos.js
├── cliente-carrinho.html
├── cliente-carrinho.js
├── cliente-finalizar.html
└── cliente-finalizar.js
```

**Obs. 2:** repare que cada tela HTML tem o seu próprio arquivo `.js`. Isso deixa claro qual script pertence a qual tela, e evita um arquivo JavaScript gigante fazendo tudo. O único arquivo compartilhado por todas as telas é o `dados.js`.

⚠️ **Atenção:** dessa vez não precisamos instalar nada com `npm`. É só criar os arquivos e abrir o `index.html` no navegador (pode usar a extensão **Live Server** do VSCode, se preferir, pra recarregar a página automaticamente a cada alteração).

