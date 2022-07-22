export const $afterPurchageViewSection = document.querySelectorAll('.mt-9');

export const $modal = document.querySelector('.modal');
export const $modalClose = document.querySelector('.modal-close');
export const $showResultButton = document.querySelector('.open-result-modal-button');

export const $purchaseInputValue = document.querySelector('input');
export const $purchaseButton = document.querySelector('.btn');
export const $lottoTickets = document.querySelector('.d-flex .flex-wrap');
export const $lottoCountLabel = document.querySelector('.flex-auto');
export const $lottoNumbersToggleButton = document.querySelector('input[type=checkbox]');

export const $winningNumbers = document.querySelectorAll('.winning-number');
export const $bonusNumber = document.querySelector('.bonus-number');
export const $resultTable = document.querySelector('tbody');
export const $winningCount = document.querySelectorAll('tbody > tr.text-center');
export const $rateOfReturn = document.querySelector('p.text-center');
export const $reset = document.querySelector('div.justify-center > button');

export const hidePurchaseViewSection = () => {
  $afterPurchageViewSection.forEach((section) => section.classList.add('d-none'));
}

export const showPurchaseViewSection = () => {
  $afterPurchageViewSection.forEach((section) => section.classList.replace('d-none', 'd-block'))
}

export const showLottoNumbers = (lottoNumbers) => {
  $lottoTickets.classList.replace('d-flex', 'd-block')

  lottoNumbers.forEach((section) => {
    section.classList.replace('d-none', 'd-block')
  })
}

export const hideLottoNumbers = (lottoNumbers) => {
  $lottoTickets.classList.replace('d-block', 'd-flex')

  lottoNumbers.forEach((section) => {
    section.classList.replace('d-block', 'd-none')
  })
}

export const addLottoCountLabel = (lottoCount) => {
  $lottoCountLabel.innerText = `총 ${lottoCount}개를 구매하였습니다.`;
}

export const addLottoTickets = (lottos) => {
  let lottoTicketTemplate = ``;

  lottos.forEach((_, index) => {
    lottoTicketTemplate += `<div class="d-flex items-center"><div class="mx-1 text-4xl lotto-ticket">🎟️ </div><div class="lotto-numbers d-none">${lottos[index].join(', ')}</div></div>`
  })

  $lottoTickets.innerHTML = lottoTicketTemplate;
}

export const renderResultTable = (rankingInfoValues) => {
  let tableRowTemplate = ``;

  $winningCount.forEach((_, index) => {
    const tableRowContent = rankingInfoValues[index];
  
    tableRowTemplate += `<tr class="text-center"><td class="p-3">${tableRowContent.matchCount}</td>
    <td class="p-3">${tableRowContent.winnings}</td>
    <td class="p-3">${tableRowContent.count}개</td></tr>`
  })

  $resultTable.innerHTML = tableRowTemplate;
}

export const renderRateOfReturn = (rankingInfoValues) => {
  let winnings = 0;
  const purchaseMoney = $purchaseInputValue.value;

  rankingInfoValues.forEach((value) => {
    winnings += value.count * Number(value.winnings.replaceAll(',', ''));
  })
  const rateOfReturn = ((winnings - purchaseMoney) / purchaseMoney) * 100
  const processedRateOfReturn = rateOfReturn === -1 ? -100 : Math.round(rateOfReturn);
  $rateOfReturn.innerHTML = `당신의 총 수익률은 ${processedRateOfReturn}% 입니다.`
}
