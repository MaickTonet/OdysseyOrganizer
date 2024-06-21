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

    //Cria um novo usuário
    const newUser = {
      name: name.value,
      password: password.value
    }

    //Verifica se o nome do usuário já existe no array
    let userExists = false
    for (let user of users) {
      if (user.name.toLowerCase() === newUser.name.toLowerCase()) {
        userExists = true
        break
      }
    }

    //Adiciona o novo usuário ao array e salva no localStorage
    if (userExists) {
      message.innerHTML = 'Usuário já existe'
    } else {
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      message.innerHTML = ''
    }
  }

  //Reseta o formulário
  name.value = ''
  password.value = ''
  name.focus()
})
