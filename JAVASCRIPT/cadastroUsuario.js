// Cadastrar novo usuário
function cadastrarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById('novoUsuario').value;
  const senha = document.getElementById('novaSenha').value;
  localStorage.setItem('usuario', JSON.stringify({ nome, senha }));
  alert('Usuário cadastrado com sucesso!');
  document.querySelector('#area_cadastro_usuario form').reset();
}