import LottoGameController from './js/ui/LottoGameController.js'
import LottoGameViewConsole from './js/ui/LottoGameViewConsole.js'

const main = () => {
  const view = new LottoGameViewConsole()
  new LottoGameController(view).run()
}

main()
