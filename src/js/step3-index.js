import { LottoApp } from './app'
import { getEl } from './utils/dom'

const App = new LottoApp(getEl('#app'))
App.render()
