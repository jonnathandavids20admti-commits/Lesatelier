const produtos = [
    {
        id: 1,
        nome: "Boneco Amigurumi",
        preco: 120,
        imagem: "img/produtos/amigurumi.jpg"
    },
    {
        id: 2,
        nome: "Vestido de Crochê",
        preco: 250,
        imagem: "img/produtos/vestido.jpg"
    },
    {
        id: 3,
        nome: "Blusa de Crochê",
        preco: 180,
        imagem: "img/produtos/blusa.jpg"
    }
];

const lista = document.getElementById("lista-produtos");

produtos.forEach(produto => {
    const card = document.createElement("div");
    card.className = "produto-card";

    card.innerHTML = `
        <img src="${produto.imagem}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarCarrinho(${produto.id})">
            Adicionar ao carrinho
        </button>
    `;

    lista.appendChild(card);
});

function adicionarCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produto = produtos.find(p => p.id === id);
    const produtoNoCarrinho = carrinho.find(p => p.id === id);

    if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}
let produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtosSalvos));
}
