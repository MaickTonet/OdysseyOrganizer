const bntCreateTask = document.getElementById('bnt-create-task')
const modalCreateTask = document.getElementById('create-task')
const bntCreateCard = document.getElementById('modal-btn-create-task')

//Abre o modal
bntCreateTask.onclick = () => {
  modalCreateTask.showModal()
}

// Reseta o modal quando fechado
modalCreateTask.addEventListener('close', () => {
  let textarea = document.getElementById('modal-set-text')
  let datearea = document.getElementById('modal-set-date')
  datearea.value = ''
  textarea.placeholder = 'Digite algo...'
  textarea.value = ''
})

document.addEventListener('DOMContentLoaded', () => {
  let cards = JSON.parse(localStorage.getItem('cards')) || []

  cards.forEach((card) => {
    createCard(card)
  })
})

function createCard(card) {
  // Seleciona a tag <main>
  const main = document.querySelector('main')

  // Criação os elementos da estrutura
  const cardElement = document.createElement('div')
  cardElement.classList.add('card')
  cardElement.id = card.id

  // Adiciona um header randômico para o card
  const cardHeader = document.createElement('div')

  //Gera um header aleatório
  const randomNumber = Math.floor(Math.random() * 10) + 1
  cardHeader.classList.add('card-header')
  cardHeader.classList.add('card-header-style-' + randomNumber)

  //Gera o ícone de check no header (inicialemnte oculto)
  const checkCard = document.createElement('i')
  checkCard.classList.add('fa-regular')
  checkCard.classList.add('fa-circle-check')
  cardHeader.appendChild(checkCard)

  //Gera a aba de informações (data e tag)
  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info')

  //Verifica se a data foi preenchida e caso seja false não inclui o valor no card
  if (card.date != '') {
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

    //Adiciona a data no card
    const dateText = document.createElement('p')
    dateText.classList.add('date-text')
    dateText.textContent = formatDate(card.date)

    cardInfoDate.appendChild(dateIcon)
    cardInfoDate.appendChild(dateText)
    cardInfo.appendChild(cardInfoDate)
  }

  const cardInfoTag = document.createElement('div')
  cardInfoTag.classList.add('card-info-tag')
  cardInfoTag.classList.add(card.tag.toLowerCase())

  const tagIcon = document.createElement('i')
  tagIcon.classList.add('fa-solid')
  tagIcon.classList.add('fa-tag')

  // Adiciona a tag ao card
  const tagText = document.createElement('p')
  tagText.classList.add('tag-text')
  tagText.textContent = card.tag

  const cardText = document.createElement('div')
  cardText.classList.add('card-text')

  // Adiciona o texto no card
  const cardTextContent = document.createElement('p')
  cardTextContent.classList.add('card-text-content')
  cardTextContent.textContent = card.text.trim()

  //Rodapé do card com as opções de edição e exclusão
  const cardFooter = document.createElement('div')
  cardFooter.classList.add('card-footer')

  // Adiciona o ícone de check no card
  const checkButton = document.createElement('button')
  checkButton.classList.add('check-bnt')
  checkButton.classList.add('option-bnt')
  const checkIcon = document.createElement('i')
  checkIcon.classList.add('fa-solid')
  checkIcon.classList.add('fa-circle-check')
  checkIcon.classList.add('card-footer-option')
  checkIcon.classList.add('card-footer-option-check')
  checkButton.appendChild(checkIcon)

  //Alterar o card para concluído
  checkButton.addEventListener('click', () => {
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
  const editIcon = document.createElement('i')
  const editButton = document.createElement('button')
  editButton.classList.add('edit-bnt')
  editButton.classList.add('option-bnt')
  editIcon.classList.add('fa-solid')
  editIcon.classList.add('fa-pen')
  editIcon.classList.add('card-footer-option')
  editIcon.classList.add('card-footer-option-edit')
  editButton.appendChild(editIcon)

  editButton.addEventListener('click', function () {
    const modalEditTask = document.getElementById('edit-task')
    const currentCard = this.closest('.card')

    modalEditTask.showModal()

    if (currentCard) {
      const submitButton = document.getElementById('modal-btn-edit-task')

      let cards = JSON.parse(localStorage.getItem('cards')) || []
      let selectedCard = cards.find((card) => card.id === parseInt(currentCard.id))

      const editNote = document.getElementById('textarea-edit-task')
      const editDate = document.getElementById('modal-edit-date')
      const editTag = document.getElementById('modal-edit-tag')

      editNote.value = selectedCard.text
      editDate.value = selectedCard.date
      editTag.value = selectedCard.tag

      submitButton.onclick = () => {
        selectedCard.text = editNote.value
        selectedCard.date = editDate.value
        selectedCard.tag = editTag.value
  
        // Update the card in localStorage
        localStorage.setItem('cards', JSON.stringify(cards))
  
        // Update the card on the page
        cardTextContent.textContent = selectedCard.text
        cardInfoTag.textContent = selectedCard.tag
  
        // Close the modal
        modalEditTask.close()
      }
    }
  })

  // Adiciona o ícone de delete no card
  const deleteIcon = document.createElement('i')
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-bnt')
  deleteButton.classList.add('option-bnt')
  deleteIcon.classList.add('fa-solid')
  deleteIcon.classList.add('fa-trash')
  deleteIcon.classList.add('card-footer-option')
  deleteIcon.classList.add('card-footer-option-delete')
  deleteButton.appendChild(deleteIcon)

  // Deleta o card caso o botão seja pressionado
  deleteButton.addEventListener('click', function () {
    let cards = JSON.parse(localStorage.getItem('cards')) || []
    const currentCard = this.closest('.card')

    cards = cards.filter((card) => card.id !== parseInt(currentCard.id))
    currentCard.remove()
    localStorage.setItem('cards', JSON.stringify(cards))
  })

  // Monta a estrutura
  cardInfoTag.appendChild(tagIcon)
  cardInfoTag.appendChild(tagText)

  cardInfo.appendChild(cardInfoTag)

  cardText.appendChild(cardTextContent)

  cardFooter.appendChild(checkButton)
  cardFooter.appendChild(editButton)
  cardFooter.appendChild(deleteButton)

  cardElement.appendChild(cardHeader)
  cardElement.appendChild(cardInfo)
  cardElement.appendChild(cardText)
  cardElement.appendChild(cardFooter)

  // Adiciona a estrutura ao elemento <main>
  main.appendChild(cardElement)
}

bntCreateCard.onclick = () => {
  //verifica se o textarea foi preenchido
  let textarea = document.getElementById('modal-set-text')
  if (textarea.value == '') {
    textarea.placeholder = 'Digite algum texto para adicionar o card'
  } else {
    //Pega o array de cards do localStorage
    let cards = JSON.parse(localStorage.getItem('cards')) || []

    //Cria um novo card
    const card = {
      id: cards.length + 1,
      date: document.getElementById('modal-set-date').value,
      tag: document.getElementById('modal-set-tag').value,
      text: document.getElementById('modal-set-text').value,
      check: false
    }

    //Adiciona o novo card ao array
    cards.push(card)
    localStorage.setItem('cards', JSON.stringify(cards))

    //Cria o card na tela
    createCard(card)

    //Fecha o modal
    modalCreateTask.close()
  }
}
;('')
