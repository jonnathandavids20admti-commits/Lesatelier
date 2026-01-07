let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const divCarrinho = document.getElementById("carrinho");
const totalEl = document.getElementById("total");

function renderCarrinho() {
    divCarrinho.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        divCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalEl.innerText = "";
        return;
    }

    carrinho.forEach(produto => {
        const subtotal = produto.preco * produto.quantidade;
        total += subtotal;

        const item = document.createElement("div");
        item.style.marginBottom = "15px";

        item.innerHTML = `
            <p>
                <strong>${produto.nome}</strong><br>
                Preço: R$ ${produto.preco.toFixed(2)}<br>
                Subtotal: R$ ${subtotal.toFixed(2)}
            </p>

            <button onclick="alterarQuantidade(${produto.id}, -1)">➖</button>
            <span style="margin: 0 10px;">${produto.quantidade}</span>
            <button onclick="alterarQuantidade(${produto.id}, 1)">➕</button>

            <button onclick="removerItem(${produto.id})" style="margin-left: 10px;">
                ❌ Remover
            </button>
            <hr>
        `;

        divCarrinho.appendChild(item);
    });

    totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
}


function alterarQuantidade(id, delta) {
    const produto = carrinho.find(p => p.id === id);

    if (!produto) return;

    produto.quantidade += delta;

    if (produto.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== id);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const nome = document.getElementById("nome").value;
    const telefoneCliente = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    if (!nome || !telefoneCliente || !endereco) {
        alert("Preencha todos os dados do cliente.");
        return;
    }

    let mensagem = "🧶 *Novo pedido - Crochê Store*%0A%0A";
    mensagem += `👤 *Nome:* ${nome}%0A`;
    mensagem += `📞 *Telefone:* ${telefoneCliente}%0A`;
    mensagem += `📍 *Endereço:* ${endereco}%0A%0A`;

    let total = 0;

    carrinho.forEach((produto, index) => {
        const subtotal = produto.preco * produto.quantidade;
        mensagem += `${index + 1}. ${produto.nome} (x${produto.quantidade}) - R$ ${subtotal.toFixed(2)}%0A`;
        total += subtotal;
    });

    mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;
    mensagem += `%0A💳 *Pagamento:* Pix`;
    mensagem += `%0A🔑 *Chave Pix:* ${document.getElementById("pix-chave").value}`;
    mensagem += `%0A%0A📎 Enviarei o comprovante após o pagamento.`;
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

pedidos.push({
    data: new Date().toLocaleString(),
    cliente: {
        nome,
        telefone: telefoneCliente,
        endereco
    },
    itens: carrinho,
    total
});

localStorage.setItem("pedidos", JSON.stringify(pedidos));

// limpa carrinho após salvar
localStorage.removeItem("carrinho");

    const telefoneLoja = "5521986361352"; // número da loja
    const url = `https://wa.me/${telefoneLoja}?text=${mensagem}`;

    window.open(url, "_blank");
}

function removerItem(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}
function copiarPix() {
    const pix = document.getElementById("pix-chave");
    pix.select();
    pix.setSelectionRange(0, 99999);
    document.execCommand("copy");

    alert("Chave Pix copiada!");
}

function finalizarPedidoWhatsApp() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem = "🧶 *Novo pedido - Lêsatelier* 🧶%0A%0A";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${item.preco.toFixed(2)}%0A`;
        total += item.preco * item.quantidade;
    });

    mensagem += `%0A*Total:* R$ ${total.toFixed(2)}%0A`;
    mensagem += `%0A📦 Entrega local`;

    let telefone = "5521986361352"; // <<< SEU NÚMERO AQUI
    let url = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(url, "_blank");
}
