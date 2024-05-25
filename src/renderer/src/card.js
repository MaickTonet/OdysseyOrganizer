// Código para abrir o modal de criação de card
const bntCreateTask = document.getElementById('bnt-create-task')
const modalCreateTask = document.getElementById('create-task')

//Abre o modal
bntCreateTask.onclick = function () {
  modalCreateTask.showModal()
}

// Reseta o placeholder de texto quando o modal é fechado
modalCreateTask.addEventListener('close', function () {
  let textarea = document.getElementById('textarea-create-task')
  textarea.placeholder = 'Digite algo...'
})

// Codigo para criar o card
const bntCreateCard = document.getElementById('modal-btn-create-task')

function createCard() {
  // Seleciona a tag <main>
  const main = document.querySelector('main')

  // Criação os elementos da estrutura
  const card = document.createElement('div')
  card.classList.add('card')

  const cardHeader = document.createElement('div')
  cardHeader.classList.add('card-header')

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
        const horas = String(dataObj.getHours()).padStart(2, '0')
        const minutos = String(dataObj.getMinutes()).padStart(2, '0')
        return `${dia}/${mes}/${ano} - ${horas}:${minutos}`
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
  cardTextContent.textContent = cardTextValue.value

  const cardFooter = document.createElement('div')
  cardFooter.classList.add('card-footer')

  const footerList = document.createElement('ul')

  const footerItem1 = document.createElement('li')
  const checkIcon = document.createElement('i')
  checkIcon.classList.add('fa-solid')
  checkIcon.classList.add('fa-circle-check')
  checkIcon.classList.add('card-footer-option')
  footerItem1.appendChild(checkIcon)

  const footerItem2 = document.createElement('li')
  const editIcon = document.createElement('i')
  editIcon.classList.add('fa-solid')
  editIcon.classList.add('fa-pen')
  editIcon.classList.add('card-footer-option')
  footerItem2.appendChild(editIcon)

  const footerItem3 = document.createElement('li')
  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fa-solid')
  deleteIcon.classList.add('fa-trash')
  deleteIcon.classList.add('card-footer-option')
  footerItem3.appendChild(deleteIcon)

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
  let textarea = document.getElementById('textarea-create-task')

  if (document.getElementById('textarea-create-task').value == '') {
    textarea.placeholder = 'Digite algum texto para adicionar o card'
  } else {
    modalCreateTask.close()
    createCard()
    textarea.value = ''
  }
}
