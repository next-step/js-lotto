import { getSelector } from './utils/index.js';
import LottoList from './view/lottoList.js';
import LottoListNumber from './view/lottoListNumber.js';
import LottoWinningForm from './view/lottoWinningForm.js';

const lottoList = new LottoList();
const lottoNumberDisplay = new LottoListNumber();
const lottoWinningForm = new LottoWinningForm();
lottoList.init();
lottoNumberDisplay.init();
lottoWinningForm.init();
