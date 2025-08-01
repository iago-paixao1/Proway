function logar() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');

  if (usuario === 'iago' && senha === '1234+') {
    localStorage.setItem('logado', 'sim');
    window.location.href = 'dashboard.html';
  } else {
    erro.textContent = 'Usuário ou senha incorretos';
  }
}

function checarLogin() {
  if (localStorage.getItem('logado') !== 'sim') {
    window.location.href = 'login.html';
  }
}

function mostrarDashboard() {
  ativarPainel('dashboard');
  atualizarResumo();
}

function mostrarLista() {
  ativarPainel('lista');
  carregarTabela();
}

function mostrarCadastro() {
  ativarPainel('cadastro');
}

function ativarPainel(id) {
  document.querySelectorAll('.painel').forEach(p => p.classList.remove('ativo'));
  document.getElementById(id).classList.add('ativo');
}

function cadastrarProduto(event) {
  event.preventDefault();
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const categoria = document.getElementById('categoria').value;
  const estoque = parseInt(document.getElementById('estoque').value);

  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  const novoProduto = {
    codigo: produtos.length + 1,
    descricao,
    valor,
    categoria,
    estoque
  };

  produtos.push(novoProduto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  alert('Produto cadastrado com sucesso!');
  mostrarLista();
}

function carregarTabela() {
  const tabela = document.getElementById('tabelaProdutos');
  tabela.innerHTML = '';
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

  produtos.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prod.codigo}</td>
      <td>${prod.descricao}</td>
      <td>R$ ${prod.valor.toFixed(2)}</td>
      <td>${prod.categoria}</td>
      <td>${prod.estoque}</td>
      <td><button onclick="editarProduto(${prod.codigo})">Editar</button></td>
    `;
    tabela.appendChild(tr);
  });
}

function atualizarResumo() {
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  const totalEstoque = produtos.reduce((acc, p) => acc + p.estoque, 0);
  const totalProdutos = produtos.length;
  const valorTotal = produtos.reduce((acc, p) => acc + (p.valor * p.estoque), 0);

  document.getElementById('estoqueTotal').textContent = totalEstoque;
  document.getElementById('produtosTotal').textContent = totalProdutos;
  document.getElementById('valorTotal').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Executar em dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
  checarLogin();
  mostrarDashboard();
}
