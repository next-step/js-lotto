import { isValidateAmount } from './utils/validator.js';
import { getTicketCount, getLottoNumbers } from './lotto.js';
import { ERROR_MSSAGE, SELECTOR } from './utils/constants.js';
import { $, $all } from './utils/dom.js';


const clearLottoImages = () => {
  while ($(SELECTOR.LOTTO_IMAGES).firstChild) {
    $(SELECTOR.LOTTO_IMAGES).removeChild($(SELECTOR.LOTTO_IMAGES).firstChild);
  }
};

const setLottoElement = (purchaseAmount) => {
  const ticketCount = getTicketCount(purchaseAmount);
  $(SELECTOR.TOTAL_PURCHASED).textContent = ticketCount;

  const lottoImageTemplate = (numbers) => `<li><span class='lotto-image mx-1 text-4xl'>🎟️</span><span class='lotto-numbers' style='display:none'>${numbers.join(', ')}</span></li>`
  const lottoImageHTML = Array.from(
    { length: ticketCount },
    () => lottoImageTemplate(getLottoNumbers()),
  ).join('');
  $(SELECTOR.LOTTO_IMAGES).insertAdjacentHTML('beforeend', lottoImageHTML);
  $(SELECTOR.PURCHASED_LOTTO).style.display = 'block';
  $(SELECTOR.INPUT_LOTTO_NUMS).style.display = 'block';
}

const onPurchaseLotto = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const purchaseAmount = formData.get("purchase-amount")

  if (!isValidateAmount(purchaseAmount)) {
    alert(ERROR_MSSAGE.AMOUNT);
    return;
  }
  clearLottoImages();
  setLottoElement(purchaseAmount);
};
const showLottoNumbers = () => {
  $(SELECTOR.LOTTO_IMAGES).classList.add('d-block');
  $(SELECTOR.LOTTO_IMAGES).classList.remove('d-flex');
  $all(SELECTOR.LOTTO_NUMS).forEach((lotto) => {
    lotto.style.display = 'inline-block';
  });
};

const hideLottoNumbers = () => {
  $(SELECTOR.LOTTO_IMAGES).classList.add('d-flex');
  $(SELECTOR.LOTTO_IMAGES).classList.remove('d-block');
  $all(SELECTOR.LOTTO_NUMS).forEach((lotto) => {
    lotto.style.display = 'none';
  });
};

const onToggleLottoNumbers = (event) => {
  if (event.target.checked) {
    showLottoNumbers();
  } else {
    hideLottoNumbers();
  }
};

$(SELECTOR.PURCHASE_FORM).addEventListener('submit', onPurchaseLotto);
$(SELECTOR.LOTTO_NUM_TOGGLE).addEventListener('change', onToggleLottoNumbers);


