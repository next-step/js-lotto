import App from './App'

new App()

if (module.hot) {
  module.hot.dispose(function () {
    window.location.reload()
  })
}

const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')

const onModalClose = () => {
  $modal.classList.remove('open')
}

$modalClose.addEventListener('click', onModalClose)
