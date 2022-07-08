import { LOTTO_NUMBER_COUNT, MAX_LOTTO_NUMBER, MIN_PRICE } from "../constants/index.js";
import { STORE } from "../store/index.js";
import { validatePrice } from "../validates/index.js";
import { $modal, $purchaseInputValue, addLottoCountLabel, addLottoTicket, showPurchaseViewSection } from "../view/index.js"

export const onModalShow = () => {
  $modal.classList.add('open')
}

export const onModalClose = () => {
  $modal.classList.remove('open')
}

const getLottoNumber = (count) => {
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

export const handlePurchaseButtonClick = () => {
  const inputValue = $purchaseInputValue.value;
  const lottoCount = inputValue / MIN_PRICE;
  try {
    validatePrice(inputValue);
  } catch (error) {
    alert(error);
    return
  }

  showPurchaseViewSection();
  addLottoCountLabel(lottoCount);

  addLottoTicket(lottoCount);
  const lottos = getLottoNumber(lottoCount);
  STORE.lottos = lottos;
}

export const handleLottoNumbersToggleButtonClick = (e) => {
  const isChecked = e.target.checked;
  const lottoNumbers = document.querySelectorAll('span.mx-1');

  if (isChecked) {
   lottoNumbers.forEach((section, index) => {
    section.innerText += STORE.lottos[index].join(', ') 
   })
  } else {
    lottoNumbers.forEach((section) => {
      section.innerText = '🎟️ '
     })
  }
}