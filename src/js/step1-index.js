import { ConsoleView } from './view/ConsoleView'
import { lottoStore } from './store/index'

const view = ConsoleView()
lottoStore.subscribe(view.render)

view.renderPaymentPrompt()
