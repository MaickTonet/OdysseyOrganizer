const name = document.getElementById('name')
const password = document.getElementById('password')
const button = document.getElementById('submit-button')
const message = document.querySelector('span')

//Submete os dados do formulário
button.addEventListener('click', () => {
  //Verifica se os campos estão preenchidos
  if (name.value === '' || password.value === '') {
    message.innerHTML = 'Os campos devem ser preenchidos'
  } else {
    //Pega o array de usuários salvos no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || []

    //Cria as credenciais de acesso
    const newUser = {
      name: name.value,
      password: password.value
    }

    //Verifica se o nome do usuário já existe no array
    for (let user of users) {
      if (user.name.toLowerCase() === newUser.name.toLowerCase() && user.password === newUser.password) {
        sessionStorage.setItem('currentUser', newUser.name)
        console.log('foi');
        window.location.href = './pages/dashboard.html'
        break
      }
    }
  }

  //Reseta o formulário
  name.value = ''
  password.value = ''
  name.focus()
})
