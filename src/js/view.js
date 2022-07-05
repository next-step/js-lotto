export const showModal = function (modalElement) {
  modalElement.classList.add('open')
}

export const closeModal = function (modalElement) {
  modalElement.classList.remove('open')
}