import { LOTTO_NUMBER_COUNT, MAX_LOTTO_NUMBER, MIN_PRICE } from "../constants/index.js";
import { validatePrice } from "../validates/index.js";
import { $lottoTickets, $modal, $purchaseInputValue, addLottoCountLabel, addLottoTickets, showPurchaseViewSection } from "../view/index.js"

export const onModalShow = () => {
  $modal.classList.add('open')
}

export const onModalClose = () => {
  $modal.classList.remove('open')
}

const getLottoNumbers = (count) => {
  let lottos = [];
  for (let i = 0; i < count; i++) {
    let lotto = []
    while (lotto.length < LOTTO_NUMBER_COUNT) {
      const number = parseInt(Math.random() * MAX_LOTTO_NUMBER) + 1;
      if (!lotto.includes(number)) {
        lotto.push(number);
      }
    }
    lottos.push(lotto);
  }
  return lottos
};

const catchError = (inputValue) => {
  try {
    validatePrice(inputValue);
  } catch (error) {
    return error;
  }
};

export const handlePurchaseButtonClick = () => {
  const inputValue = $purchaseInputValue.value;
  const lottoCount = inputValue / MIN_PRICE;
  const errorMessage = catchError(inputValue);
  const lottos = getLottoNumbers(lottoCount);
  
  if (errorMessage) {
    alert(errorMessage)
    return
  }

  showPurchaseViewSection();
  addLottoCountLabel(lottoCount);
  addLottoTickets(lottos);
}

export const handleLottoNumbersToggleButtonClick = (e) => {
  const isChecked = e.target.checked;
  const lottoNumbers = document.querySelectorAll('div.lotto-numbers');

  if (isChecked) {
    $lottoTickets.classList.replace('d-flex', 'd-block')
    lottoNumbers.forEach((section) => {
      section.classList.replace('d-none', 'd-block')
    })
  } else {
    $lottoTickets.classList.replace('d-block', 'd-flex')
    lottoNumbers.forEach((section) => {
      section.classList.replace('d-block', 'd-none')
    })
  }
}