// --- SISTEMA DE TEMA (CLARO / ESCURO) ---
const botaoTema = document.getElementById("btn-tema");

// Verifica se o usuário já tinha uma preferência salva
if (localStorage.getItem("tema") === "dark") {
	document.body.classList.add("dark-theme");
	botaoTema.textContent = "☀️ Modo Claro";
}

botaoTema.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");

	if (document.body.classList.contains("dark-theme")) {
		localStorage.setItem("tema", "dark");
		botaoTema.textContent = "☀️ Modo Claro";
	} else {
		localStorage.setItem("tema", "light");
		botaoTema.textContent = "🌙 Modo Escuro";
	}
});

// --- SISTEMA DO CARRINHO LATERAL ---
let carrinho = [];

const carrinhoLateral = document.getElementById("carrinho-lateral");
const abrirCarrinhoBtn = document.getElementById("abrir-carrinho");
const fecharCarrinhoBtn = document.getElementById("fechar-carrinho");
const carrinhoItensContainer = document.getElementById("carrinho-itens");
const carrinhoTotalElement = document.getElementById("carrinho-total");

// Abrir e fechar carrinho lateral
abrirCarrinhoBtn.addEventListener("click", () => {
	carrinhoLateral.classList.add("aberto");
});

fecharCarrinhoBtn.addEventListener("click", () => {
	carrinhoLateral.classList.remove("aberto");
});

// Captura cliques nos botões de "Adicionar" dos pratos
document.querySelectorAll(".btn-adicionar").forEach((botao) => {
	botao.addEventListener("click", () => {
		const nome = botao.getAttribute("data-nome");
		const preco = parseFloat(botao.getAttribute("data-preco"));

		adicionarAoCarrinho(nome, preco);

		// Abre o carrinho automaticamente para feedback visual ao usuário
		carrinhoLateral.classList.add("aberto");
	});
});

function adicionarAoCarrinho(nome, preco) {
	const itemExistente = carrinho.find((item) => item.nome === nome);

	if (itemExistente) {
		itemExistente.quantidade++;
	} else {
		carrinho.push({ nome, preco, quantidade: 1 });
	}

	atualizarCarrinho();
}

function alterarQuantidade(nome, mudanca) {
	const item = carrinho.find((item) => item.nome === nome);
	if (!item) return;

	item.quantidade += mudanca;

	if (item.quantidade <= 0) {
		carrinho = carrinho.filter((i) => i.nome !== nome);
	}

	atualizarCarrinho();
}

function atualizarCarrinho() {
	carrinhoItensContainer.innerHTML = "";
	let total = 0;

	carrinho.forEach((item) => {
		const subtotal = item.preco * item.quantidade;
		total += subtotal;

		const itemDiv = document.createElement("div");
		itemDiv.classList.add("carrinho-item-linha");
		itemDiv.innerHTML = `
            <div class="info-item-carrinho">
                <span class="nome-prod">${item.nome}</span>
                <span class="preco-prod">R$ ${subtotal.toFixed(2)}</span>
            </div>
            <div class="controles-carrinho">
                <button onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
            </div>
        `;
		carrinhoItensContainer.appendChild(itemDiv);
	});

	carrinhoTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Botão de Pagamento
document.getElementById("btn-pagar").addEventListener("click", () => {
	if (carrinho.length === 0) {
		alert("Seu carrinho está vazio!");
		return;
	}
	alert("Pedido enviado com sucesso! Prepare sua IDE enquanto preparamos seu café.");
	carrinho = [];
	atualizarCarrinho();
	carrinhoLateral.classList.remove("aberto");
});
