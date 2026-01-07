let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto() {
    let nome = document.getElementById("nome").value;
    let preco = parseFloat(document.getElementById("preco").value);
    let imagem = document.getElementById("imagem").value;
    let descricao = document.getElementById("descricao").value;

    if (!nome || !preco || !imagem) {
        alert("Preencha nome, preço e imagem.");
        return;
    }

    let produto = {
        id: Date.now(),
        nome,
        preco,
        imagem,
        descricao
    };

    produtos.push(produto);
    salvarProdutos();
    listarProdutosAdmin();
    limparFormulario();
}

function listarProdutosAdmin() {
    let lista = document.getElementById("lista-produtos-admin");
    lista.innerHTML = "";

    produtos.forEach(produto => {
        let div = document.createElement("div");
        div.classList.add("carrinho-item");

        div.innerHTML = `
            <strong>${produto.nome}</strong><br>
            R$ ${produto.preco.toFixed(2)}<br>
            <button onclick="removerProduto(${produto.id})">Excluir</button>
        `;

        lista.appendChild(div);
    });
}

function removerProduto(id) {
    produtos = produtos.filter(p => p.id !== id);
    salvarProdutos();
    listarProdutosAdmin();
}

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";
}

listarProdutosAdmin();
