import { ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE } from '../../constants/error.const.js';

const runPurchase = (lotto) => {
  const $purchaseAmountForm = document.querySelector('#purchase-amount-form');
  const $purchaseAmountInput = document.querySelector(
    '#purchase-amount__input'
  );

  const $purchaseLottosSection = document.querySelector(
    '#purchase-lottos-section'
  );
  const $purchaseLottosLabel = document.querySelector(
    '#purchase-lottos__label'
  );
  const $purchaseLottosTicket = document.querySelector(
    '[data-ticket="purchase-lottos__ticket"]'
  );
  const $purchaseLottosSwitch = document.querySelector(
    '#lotto-numbers-toggle-button'
  );

  const $lottoAnswersForm = document.querySelector('#lotto-answers-form');

  const showBelowElements = (isShow) => {
    const visibilityStyle = isShow ? 'visible' : 'hidden';

    $purchaseLottosSection.style.visibility = visibilityStyle;
    $lottoAnswersForm.style.visibility = visibilityStyle;
  };

  const createPurchaseLottosElements = (purchasedLottoCounts) => {
    $purchaseLottosLabel.innerHTML = `
  총 ${purchasedLottoCounts}개를 구매하였습니다.
`;

    if (purchasedLottoCounts === 0) {
      $purchaseLottosTicket.parentElement.style.visibility = 'hidden';
      return;
    }

    if (purchasedLottoCounts > 1) {
      $purchaseLottosTicket.parentElement.style.visibility = 'visible';
      Array(purchasedLottoCounts - 1)
        .fill($purchaseLottosTicket)
        .forEach((element) => {
          $purchaseLottosTicket.parentElement.appendChild(
            element.cloneNode(true)
          );
        });
    }
  };

  $purchaseAmountForm.addEventListener('change', (event) => {
    const { value: purchaseAmount } = event.target;

    if (!lotto.validatePurchaseAmount(purchaseAmount)) {
      alert(ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE);
      $purchaseAmountInput.value = '';
      return;
    }

    lotto.setPurchasedLottoCounts(purchaseAmount);

    const purchasedLottoCounts = lotto.getPurchasedLottoCounts();
    lotto.setLottoCandidates(purchasedLottoCounts);

    showBelowElements(true);

    createPurchaseLottosElements(purchasedLottoCounts);
  });

  $purchaseAmountForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  $purchaseLottosSwitch.addEventListener('change', (event) => {
    const { checked } = event.target;

    const tickets = document.querySelectorAll(
      '[data-ticket="purchase-lottos__ticket"]'
    );
    const lottoCandidates = document.querySelectorAll(
      '[data-candidate="lotto-candidate"]'
    );

    if (checked) {
      if (lottoCandidates.length < 1) {
        tickets.forEach((ticket, idx) => {
          const lottoCandidate = document.createElement('span');
          lottoCandidate.dataset.candidate = 'lotto-candidate';
          lottoCandidate.innerHTML = lotto.getLottoCandidates()[idx];

          ticket.appendChild(lottoCandidate);
        });
      } else {
        lottoCandidates.forEach((lottoCandidate) => {
          lottoCandidate.style.display = 'inline-block';
        });
      }
    } else {
      lottoCandidates.forEach((lottoCandidate) => {
        lottoCandidate.style.display = 'none';
      });
    }
  });
};

export default runPurchase;
