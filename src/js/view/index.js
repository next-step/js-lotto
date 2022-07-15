export const $afterPurchageViewSection = document.querySelectorAll('.mt-9');

export const $modal = document.querySelector('.modal');
export const $modalClose = document.querySelector('.modal-close');
export const $showResultButton = document.querySelector('.open-result-modal-button');

export const $purchaseInputValue = document.querySelector('input');
export const $purchaseButton = document.querySelector('.btn');
export const $lottoTickets = document.querySelector('.d-flex .flex-wrap');
export const $lottoCountLabel = document.querySelector('.flex-auto');
export const $lottoNumbersToggleButton = document.querySelector('input[type=checkbox]');

export const hidePurchaseViewSection = () => {
  $afterPurchageViewSection.forEach((section) => section.classList.add('d-none'));
}

export const showPurchaseViewSection = () => {
  $afterPurchageViewSection.forEach((section) => section.classList.add('d-block'))
}

export const addLottoCountLabel = (lottoCount) => {
  $lottoCountLabel.innerText = `총 ${lottoCount}개를 구매하였습니다.`;
}

export const addLottoTicket = (lottoCount) => {
  let lottoTicketTemplate = ``;

  for ( let i = 0; i < lottoCount; i++ ) {
    lottoTicketTemplate += '<span class="mx-1 text-4xl">🎟️ </span>'
  }
  $lottoTickets.innerHTML = lottoTicketTemplate;
}

