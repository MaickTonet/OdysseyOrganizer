// Código para abrir o modal de criação de card
const bntCreateTask = document.getElementById('bnt-create-task')
const modalCreateTask = document.getElementById('create-task')

bntCreateTask.onclick = function () {
  modalCreateTask.showModal()
}

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

  const cardInfoDate = document.createElement('div')
  cardInfoDate.classList.add('card-info-date')

  const dateIcon = document.createElement('img')
  dateIcon.src = '../../resources/assets/date-icon.svg'

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

  const cardInfoTag = document.createElement('div')
  cardInfoTag.classList.add('card-info-tag')

  const tagIcon = document.createElement('img')
  tagIcon.src = '../../resources/assets/tag-icon.svg'

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
  const checkIcon = document.createElement('img')
  checkIcon.src = '../../resources/assets/check-icon.svg'
  checkIcon.classList.add('card-footer-option')
  footerItem1.appendChild(checkIcon)

  const footerItem2 = document.createElement('li')
  const editIcon = document.createElement('img')
  editIcon.src = '../../resources/assets/edit-icon.svg'
  editIcon.classList.add('card-footer-option')
  footerItem2.appendChild(editIcon)

  const footerItem3 = document.createElement('li')
  const deleteIcon = document.createElement('img')
  deleteIcon.src = '../../resources/assets/delete-icon.svg'
  deleteIcon.classList.add('card-footer-option')
  footerItem3.appendChild(deleteIcon)

  // Monta a estrutura
  cardInfoDate.appendChild(dateIcon)
  cardInfoDate.appendChild(dateText)

  cardInfoTag.appendChild(tagIcon)
  cardInfoTag.appendChild(tagText)

  cardInfo.appendChild(cardInfoDate)
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

bntCreateCard.onclick = function () {
  createCard()
}
