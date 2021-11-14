import App from './App'

new App()

if (module.hot) {
  module.hot.dispose(function () {
    window.location.reload()
  })
}
