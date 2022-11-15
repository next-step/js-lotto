import { LottoMachine } from './modules/LottoMachine.js'
import { LOTTO_MACHINE_CONFIG } from './constant.js'
import './components/lotto.js'

export const lottoMachine = new LottoMachine(LOTTO_MACHINE_CONFIG).init()
