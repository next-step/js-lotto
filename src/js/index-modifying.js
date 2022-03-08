import {$, $$} from "./modules/utils.js";
import App from "./pages/App.js";

new App('#app');

const $modalClose = $('.modal-close');
const $modal = $('.modal');


const eleLottoTicket = '<span class="mx-1 text-4xl">🎟️ </span>';
const eleLottoTicketAndNumbers = numbers => `<div class="mx-1 text-4xl d-flex items-center">🎟️ <span class="mx-3 text-xl">${numbers.join(', ')}</span></div>`;

const onModalShow = () => {
  $modal.classList.add('open')
}
const onModalClose = () => {
  $modal.classList.remove('open')
}

const LOTTO_NUMBERS = []



function render() {
  $purchaseAmount.innerHTML = LOTTO_NUMBERS.length
  $lottoTickets.innerHTML = LOTTO_NUMBERS.reduce((lottos, lottoNumber) => {
    lottos += eleLottoTicket
    return lottos
  }, '')
  $lottoTicketsAndNumbers.innerHTML = LOTTO_NUMBERS.reduce((lottos, lottoNumber) => {
    lottos += eleLottoTicketAndNumbers(lottoNumber)
    return lottos
  }, '')
}

function getLottoNumbers() {
  const lottoSet = new Set()
  while(lottoSet.size < 6) {
    lottoSet.add(getRandomIntInclusive(1, 45))
  }
  return Array.from(lottoSet).sort((a, b) => a-b)
}

function getRandomIntInclusive(min = 1, max = 45) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}


$modalClose.addEventListener('click', onModalClose)

