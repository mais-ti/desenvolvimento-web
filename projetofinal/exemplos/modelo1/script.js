const produtos = [
  { nome: 'X-Burger', preco: 18 },
  { nome: 'Pizza individual', preco: 25 },
  { nome: 'Batata frita', preco: 12 },
  { nome: 'Refrigerante', preco: 6 },
  { nome: 'Suco natural', preco: 8 }
];

const quantidades = [0, 0, 0, 0, 0];
const subtotais = [0, 0, 0, 0, 0];

const cardapio = document.getElementById('cardapio');
const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
const vazio = document.getElementById('vazio');
const botaoEnviar = document.getElementById('enviar');
const mensagemWhatsApp = document.getElementById('mensagem-whatsapp');

function formatarPreco(valor) {
  return 'R$ ' + valor + ',00';
}

function mostrarProduto(indice) {
  const produto = produtos[indice];

  cardapio.innerHTML += `
    <article class="item">
      <div>
        <h2>${produto.nome}</h2>
        <p class="preco">${formatarPreco(produto.preco)}</p>
      </div>
      <div class="controles">
        <button type="button" onclick="alterarQuantidade(${indice}, -1, -${produto.preco})" aria-label="Remover ${produto.nome}">−</button>
        <span class="quantidade" id="qtd-${indice}">0</span>
        <button type="button" onclick="alterarQuantidade(${indice}, 1, ${produto.preco})" aria-label="Adicionar ${produto.nome}">+</button>
      </div>
    </article>`;
}

function alterarQuantidade(indice, mudanca, ajustePreco) {
  if (quantidades[indice] === 0 && mudanca === -1) {
    return;
  }

  quantidades[indice] += mudanca;
  subtotais[indice] += ajustePreco;
  document.getElementById(`qtd-${indice}`).textContent = quantidades[indice];
  atualizarPedido();
}

function adicionarItemPedido(indice, pedido) {
  const quantidade = quantidades[indice];

  if (quantidade === 0) {
    return;
  }

  const produto = produtos[indice];
  const subtotal = subtotais[indice];
  const descricao = `${quantidade}x ${produto.nome} — ${formatarPreco(subtotal)}`;
  const linha = document.createElement('li');
  linha.textContent = descricao;
  listaPedido.appendChild(linha);

  pedido.total += subtotal;
  pedido.mensagem += descricao + '\n';
}

function atualizarPedido() {
  const pedido = {
    total: 0,
    mensagem: 'Pedido — Esquina do Sabor\n\n'
  };

  listaPedido.innerHTML = '';
  adicionarItemPedido(0, pedido);
  adicionarItemPedido(1, pedido);
  adicionarItemPedido(2, pedido);
  adicionarItemPedido(3, pedido);
  adicionarItemPedido(4, pedido);

  totalElemento.textContent = formatarPreco(pedido.total);
  mensagemWhatsApp.value = pedido.mensagem + '\nTotal: ' + formatarPreco(pedido.total);

  if (pedido.total === 0) {
    vazio.style.display = 'block';
    botaoEnviar.disabled = true;
  } else {
    vazio.style.display = 'none';
    botaoEnviar.disabled = false;
  }
}

mostrarProduto(0);
mostrarProduto(1);
mostrarProduto(2);
mostrarProduto(3);
mostrarProduto(4);
atualizarPedido();
