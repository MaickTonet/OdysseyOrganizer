// Código para abrir o modal de criação de card
const bntCreateTask = document.getElementById('bnt-create-task')
const modalCreateTask = document.getElementById('create-task')

//Abre o modal
bntCreateTask.onclick = function () {
  modalCreateTask.showModal()
}

// Reseta o modal quando fechado
modalCreateTask.addEventListener('close', function () {
  let textarea = document.getElementById('textarea-create-task')
  let datearea = document.getElementById('modal-set-date')
  let tagarea = document.getElementById('modal-set-tag')
  tagarea.value = ''
  datearea.value = ''
  textarea.placeholder = 'Digite algo...'
  textarea.value = ''
})

// Codigo para criar o card
const bntCreateCard = document.getElementById('modal-btn-create-task')

function createCard() {
  // Seleciona a tag <main>
  const main = document.querySelector('main')

  // Criação os elementos da estrutura
  const card = document.createElement('div')
  card.classList.add('card')

  // Adiciona um header randômico para o card
  const cardHeader = document.createElement('div')

  const randomNumber = Math.floor(Math.random() * 10) + 1
  cardHeader.classList.add('card-header')
  cardHeader.classList.add('card-header-style-' + randomNumber)
  const checkCard = document.createElement('i')
  checkCard.classList.add('fa-regular')
  checkCard.classList.add('fa-circle-check')
  cardHeader.appendChild(checkCard)

  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info')

  //Verifica se a data foi preenchida e caso seja false não inclui o valor no card
  if (isNaN(document.getElementById('modal-set-date').value)) {
    const cardInfoDate = document.createElement('div')
    cardInfoDate.classList.add('card-info-date')

    const dateIcon = document.createElement('i')
    dateIcon.classList.add('fa-solid')
    dateIcon.classList.add('fa-calendar-days')

    // Formata a data
    function formatDate(data) {
      if (isNaN(parseInt(data))) {
        return ''
      } else {
        const dataObj = new Date(data)
        const dia = String(dataObj.getDate()).padStart(2, '0')
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0') // Mês é base 0, então é necessário adicionar 1
        const ano = dataObj.getFullYear()
        return `${dia}/${mes}/${ano}`
      }
    }

    const dateText = document.createElement('p')
    dateText.textContent = formatDate(document.getElementById('modal-set-date').value)

    cardInfoDate.appendChild(dateIcon)
    cardInfoDate.appendChild(dateText)
    cardInfo.appendChild(cardInfoDate)
  }

  const cardInfoTag = document.createElement('div')
  cardInfoTag.classList.add('card-info-tag')
  cardInfoTag.classList.add(document.getElementById('modal-set-tag').value)

  const tagIcon = document.createElement('i')
  tagIcon.classList.add('fa-solid')
  tagIcon.classList.add('fa-tag')

  // Pega a tag selecionada
  const selectOption = document.getElementById('modal-set-tag')
  const tagText = document.createElement('p')
  tagText.textContent = selectOption.value

  const cardText = document.createElement('div')
  cardText.classList.add('card-text')

  // Adiciona o texto no card
  const cardTextValue = document.getElementById('textarea-create-task')
  const cardTextContent = document.createElement('p')
  cardTextContent.classList.add('card-text-content')
  cardTextContent.textContent = cardTextValue.value

  const cardFooter = document.createElement('div')
  cardFooter.classList.add('card-footer')

  const footerList = document.createElement('ul')

  // Adiciona o ícone de check no card
  const footerItem1 = document.createElement('li')
  const checkButton = document.createElement('button')
  checkButton.classList.add('check-bnt')
  checkButton.classList.add('option-bnt')
  const checkIcon = document.createElement('i')
  checkIcon.classList.add('fa-solid')
  checkIcon.classList.add('fa-circle-check')
  checkIcon.classList.add('card-footer-option')
  checkIcon.classList.add('card-footer-option-check')
  checkButton.appendChild(checkIcon)
  footerItem1.appendChild(checkButton)

  //Alterar o card para concluído
  checkButton.addEventListener('click', function () {
    const currentCard = this.closest('.card')
    if (currentCard && !card.classList.contains('card-checked')) {
      cardHeader.classList.add('header-checked')
      cardHeader.classList.remove('card-header-style-' + randomNumber)
      card.classList.add('card-checked')
      checkCard.classList.add('icon-checked')
      cardTextContent.classList.add('text-checked')
    } else if (currentCard) {
      cardHeader.classList.remove('header-checked')
      cardHeader.classList.add('card-header-style-' + randomNumber)
      card.classList.remove('card-checked')
      checkCard.classList.remove('icon-checked')
      cardTextContent.classList.remove('text-checked')
    }
  })

  // Adiciona o ícone de edição no card
  const footerItem2 = document.createElement('li')
  const editIcon = document.createElement('i')
  const editButton = document.createElement('button')
  editButton.classList.add('edit-bnt')
  editButton.classList.add('option-bnt')
  editIcon.classList.add('fa-solid')
  editIcon.classList.add('fa-pen')
  editIcon.classList.add('card-footer-option')
  editIcon.classList.add('card-footer-option-edit')
  editButton.appendChild(editIcon)
  footerItem2.appendChild(editButton)

  // Adiciona o ícone de delete no card
  const footerItem3 = document.createElement('li')
  const deleteIcon = document.createElement('i')
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-bnt')
  deleteButton.classList.add('option-bnt')
  deleteIcon.classList.add('fa-solid')
  deleteIcon.classList.add('fa-trash')
  deleteIcon.classList.add('card-footer-option')
  deleteIcon.classList.add('card-footer-option-delete')
  deleteButton.appendChild(deleteIcon)
  footerItem3.appendChild(deleteButton)

  // Deleta o card caso o botão seja pressionado
  deleteButton.addEventListener('click', function () {
    const currentCard = this.closest('.card')
    if (currentCard) {
      currentCard.remove() // Remove o card pai do botão clicado
    }
  })

  // Monta a estrutura
  cardInfoTag.appendChild(tagIcon)
  cardInfoTag.appendChild(tagText)

  cardInfo.appendChild(cardInfoTag)

  cardText.appendChild(cardTextContent)

  footerList.appendChild(footerItem1)
  footerList.appendChild(footerItem2)
  footerList.appendChild(footerItem3)

  cardFooter.appendChild(footerList)

  card.appendChild(cardHeader)
  card.appendChild(cardInfo)
  card.appendChild(cardText)
  card.appendChild(cardFooter)

  // Adiciona a estrutura ao elemento <main>
  main.appendChild(card)
}

//Verifica se tem algum texto no textarea
bntCreateCard.onclick = function () {
  if (document.getElementById('textarea-create-task').value == '') {
    let textarea = document.getElementById('textarea-create-task')
    textarea.placeholder = 'Digite algum texto para adicionar o card'
  } else {
    modalCreateTask.close()
    createCard()
  }
}
