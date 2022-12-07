import { $, $all } from '../utils/dom.js';
import { SELECTOR, ERROR_MESSAGE } from '../utils/constants.js';
import { isValidateAmount, isDuplicatedNumber } from '../utils/validator.js';
import { calculateRankState } from '../utils/service.js';

let template;

const getTemplate = () => {
  if (!template) {
    template = $(SELECTOR.LOTTO_APP);
  }
  return template.content.firstElementChild.cloneNode(true);
};

const showPurchaseResult = (element) => {
  $(SELECTOR.PURCHASED_LOTTO, element).classList.remove('d-none');
  $(SELECTOR.INPUT_LOTTO_NUMS, element).classList.remove('d-none');
};

const hidePurchaseResult = (element) => {
  $(SELECTOR.PURCHASED_LOTTO, element).classList.add('d-none');
  $(SELECTOR.INPUT_LOTTO_NUMS, element).classList.add('d-none');
};

const addEvents = (targetElement, events, state) => {
  $(SELECTOR.PURCHASE_FORM, targetElement).addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const purchaseAmount = formData.get('purchase-amount');
      if (!isValidateAmount(purchaseAmount)) {
        alert(ERROR_MESSAGE.AMOUNT);
        return;
      }
      events.purchaseLotto(purchaseAmount);
    }
  );

  //toggle Event 등록
  $(SELECTOR.LOTTO_NUM_TOGGLE, targetElement).addEventListener(
    'change',
    (event) => {
      events.toggleLottoNumbers(event.target.checked);
    }
  );

  //당첨 번호 submit event 등록
  $(SELECTOR.INPUT_LOTTO_NUMS, targetElement).addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      const { lottos } = state;
      const winLottoNumbers = Array.from(
        $all(SELECTOR.WINNING_NUMS, event.target)
      ).map((element) => element.valueAsNumber);
      const bonusNumber = $(SELECTOR.BONUS_NUM, event.target).valueAsNumber;

      if (isDuplicatedNumber(winLottoNumbers, bonusNumber)) {
        alert(ERROR_MESSAGE.DUPLICATED_NUMBER);
        return;
      }

      const currentRank = calculateRankState(lottos, {
        winLottoNumbers,
        bonusNumber,
      });

      events.openModal(currentRank);
    }
  );
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());

  if (state.purchaseAmount === 0) {
    hidePurchaseResult(newApp);
  } else {
    showPurchaseResult(newApp);
  }

  $(SELECTOR.PURCHASE_INPUT, newApp).value =
    state.purchaseAmount === 0 ? null : state.purchaseAmount;

  addEvents(newApp, events, state);
  return newApp;
};
