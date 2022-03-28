import {
  LottoIo,
  LottoShop,
  LottoValidator,
  LottoRenderer,
} from './cores/index.js';
import { lottoView } from './views/index.js';

const targetElement = document.querySelector('#app');

const lottoShop = new LottoShop();
const lottoValidator = new LottoValidator();
const lottoIo = new LottoIo(lottoShop, lottoValidator);
const lottoRenderer = new LottoRenderer(targetElement);

lottoView(targetElement, lottoIo, lottoRenderer);
