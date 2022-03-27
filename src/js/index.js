import {
  LottoIo,
  LottoShop,
  LottoValidator,
  LottoRenderer,
} from './cores/index.js';
import { lottoView } from './views/index.js';

// const $showResultButton = document.querySelector('.open-result-modal-button');
// const $modalClose = document.querySelector('.modal-close');
// const $modal = document.querySelector('.modal');
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// );

// const onModalShow = () => {
//   $modal.classList.add('open');
// };

// const onModalClose = () => {
//   $modal.classList.remove('open');
// };

// $showResultButton.addEventListener('click', onModalShow);
// $modalClose.addEventListener('click', onModalClose);

const lottoShop = new LottoShop();
const lottoValidator = new LottoValidator();
const lottoIo = new LottoIo(lottoShop, lottoValidator);
const lottoRenderer = new LottoRenderer();

lottoView('#app', lottoIo, lottoRenderer);
