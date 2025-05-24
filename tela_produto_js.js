document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  const nome = document.getElementById('nome');
  const descricao = document.getElementById('descricao');
  const categoria = document.getElementById('categoria');
  const preco = document.getElementById('preco');
  const desconto = document.getElementById('desconto');
  const detalhes = document.getElementById('detalhes');
  const lista = document.getElementById('lista-produtos');

  let editIndex = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!nome.value.trim() || !descricao.value.trim() || !categoria.value.trim() || !preco.value.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Validação extra para preço e desconto como números positivos
    if (isNaN(preco.value) || Number(preco.value) <= 0) {
      alert('Por favor, informe um preço válido e positivo.');
      return;
    }
    if (desconto.value && (isNaN(desconto.value) || Number(desconto.value) < 0)) {
      alert('Por favor, informe um desconto válido (zero ou positivo).');
      return;
    }

    const produto = {
      nome: nome.value.trim(),
      descricao: descricao.value.trim(),
      categoria: categoria.value.trim(),
      preco: Number(preco.value).toFixed(2),
      desconto: desconto.value ? Number(desconto.value).toFixed(2) : '0.00',
      detalhes: detalhes.value.trim()
    };

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (editIndex !== null) {
      produtos[editIndex] = produto;
      editIndex = null;
    } else {
      produtos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));
    form.reset();
    listarProdutos();
  });

  function listarProdutos() {
    if (!lista) return;

    lista.innerHTML = '';
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos.forEach((produto, index) => {
      const item = document.createElement('div');
      item.classList.add('item-produto');
      item.innerHTML = `
        <strong>${produto.nome}</strong> - ${produto.categoria} - R$${produto.preco}
        <br><small>${produto.descricao}</small>
        <div class="acoes">
          <button type="button" onclick="editarProduto(${index})">✏️</button>
          <button type="button" onclick="excluirProduto(${index})">🗑️</button>
        </div>
      `;
      lista.appendChild(item);
    });
  }

  window.editarProduto = function (index) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos[index];
    nome.value = produto.nome;
    descricao.value = produto.descricao;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    desconto.value = produto.desconto;
    detalhes.value = produto.detalhes;
    editIndex = index;
  };

  window.excluirProduto = function (index) {
    const produtos = JSON.parse(localStorage.getItem('meusprodutos'));
    produtos.splice(index, 1);
    localStorage.setItem('meusprodutos', JSON.stringify(produtos));
    listarProdutos();
  };

  listarProdutos();
});
