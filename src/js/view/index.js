import { MIN_PRICE } from "../constants/index.js";

export const $afterPurchageViewSection = document.querySelectorAll('.mt-9');

export const $modal = document.querySelector('.modal');
export const $modalClose = document.querySelector('.modal-close');
export const $showResultButton = document.querySelector('.open-result-modal-button');

export const $purchaseInputValue = document.querySelector('input');
export const $purchaseButton = document.querySelector('.btn');
export const $lottoNumbersToggleButton = document.querySelector('input[type=checkbox]');
export const $lottoTickets = document.querySelector('.d-flex .flex-wrap');

export const $lottoNumbers = document.querySelectorAll('span.mx-1');

export const showPurchaseViewSection = () => {
  $afterPurchageViewSection.forEach((section) => section.style.display = 'block')
}

export const addLottoTicket = (inputValue) => {
  const lottoCount = inputValue / MIN_PRICE;
  let lottoTicketTemplate = ``;

  for ( let i = 0; i < lottoCount; i++ ) {
    lottoTicketTemplate += '<span class="mx-1 text-4xl">🎟️</span>'
  }
  $lottoTickets.innerHTML = lottoTicketTemplate;
}

