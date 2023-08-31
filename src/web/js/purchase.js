import { ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE } from '../../constants/error.const.js';

const init = () => {
  const $purchaseLottosContainer = document.querySelector(
    '#purchase-lottos__container'
  );

  const purchaseLottosLabel = document.createElement('label');
  purchaseLottosLabel.id = 'purchase-lottos__label';
  purchaseLottosLabel.classList.add('flex-auto', 'my-0');

  $purchaseLottosContainer.insertBefore(
    purchaseLottosLabel,
    $purchaseLottosContainer.firstChild
  );
};

const runPurchase = (lotto) => {
  init();

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
  const $purchaseLottosTicketContainer = document.querySelector(
    '#purchase-lottos-ticket-container'
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
      $purchaseLottosTicketContainer.style.visibility = 'hidden';
      return;
    }

    if (purchasedLottoCounts > 1) {
      $purchaseLottosTicketContainer.replaceChildren();

      const ticket = document.createElement('span');
      ticket.dataset.ticket = 'purchase-lottos__ticket';
      ticket.classList.add('mx-1', 'text-4xl');
      ticket.innerHTML = '🎟️';

      Array(purchasedLottoCounts)
        .fill(null)
        .forEach(() => {
          $purchaseLottosTicketContainer.appendChild(ticket.cloneNode(true));
        });

      $purchaseLottosTicketContainer.style.visibility = 'visible';
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
