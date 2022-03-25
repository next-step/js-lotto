import {
  createLottoTickets,
  isValidateAmountOfPayment,
} from "./createLotto.js";
import { PRICE_PER_LOTTO } from "./constants.js";

function LottoApp() {
  this.init = () => {
    initEventListeners();
  };

  const $showResultButton = document.querySelector(".open-result-modal-button");
  const $modalClose = document.querySelector(".modal-close");
  const $modal = document.querySelector(".modal");
  const $lottoNumbersToggleButton = document.querySelector(
    ".lotto-numbers-toggle-button",
  );
  const $purchaseButton = document.querySelector("#purchase-button");
  const $purchaseResult = document.querySelector("#purchase-result");
  const $confirmWinningNumbers = document.querySelector(
    "#confirm-winning-numbers",
  );
  const $lottoList = document.querySelector(".lotto-list");
  const $purchasedLottoCount = document.querySelector("#purchased-lotto-count");
  const $purchasePrice = document.querySelector("#purchase-price");

  const onModalShow = () => {
    $modal.classList.add("open");
  };

  const onModalClose = () => {
    $modal.classList.remove("open");
  };

  const lottoNumbersToggle = event => {
    if (event.target.checked) {
      showPurchasedLottoNumbers();
      alignVerticalLottoList();
    } else {
      hidePurchasedLottoNumbers();
      alignHorizontalLottoList();
    }
  };

  const showPurchasedLottoNumbers = () => {
    const lottoNumbers = document.querySelectorAll(".lotto-numbers");
    lottoNumbers.forEach(lottoNumber => {
      lottoNumber.classList.remove("numbers-closed");
    });
  };

  const hidePurchasedLottoNumbers = () => {
    const lottoNumbers = document.querySelectorAll(".lotto-numbers");
    lottoNumbers.forEach(lottoNumber => {
      lottoNumber.classList.add("numbers-closed");
    });
  };

  const alignVerticalLottoList = () => {
    $lottoList.classList.remove("d-flex");
  };

  const alignHorizontalLottoList = () => {
    $lottoList.classList.add("d-flex");
  };

  const showPurchaseResult = () => {
    $purchaseResult.classList.remove("pre-purchase");
  };

  const hidePurchaseResult = () => {
    $purchaseResult.classList.add("pre-purchase");
  };

  const showConfirmWinningNumbers = () => {
    $confirmWinningNumbers.classList.remove("pre-purchase");
  };

  const hideConfirmWinningNumbers = () => {
    $confirmWinningNumbers.classList.add("pre-purchase");
  };

  const beforePurchaseLotto = () => {
    $lottoNumbersToggleButton.checked = false;
    alignHorizontalLottoList();
    hidePurchaseResult();
    hideConfirmWinningNumbers();
  };

  const afterPurchaseLotto = (numberOfLottoTickets, purchasedLottoTickets) => {
    renderPurchasedLotto(numberOfLottoTickets, purchasedLottoTickets);
    showPurchaseResult();
    showConfirmWinningNumbers();
  };

  const purchaseLottoTickets = () => {
    beforePurchaseLotto();

    const $purchasePrice = document.querySelector("#purchase-price");
    const purchasePrice = Number($purchasePrice.value);

    if (!isValidateAmountOfPayment(purchasePrice)) {
      alert("구입 금액은 1,000원 단위로 입력해 주세요.");
      $purchasePrice.value = "";
      return;
    }
    const numberOfLottoTickets = purchasePrice / PRICE_PER_LOTTO;
    const purchasedLottoTickets = createLottoTickets(numberOfLottoTickets);

    afterPurchaseLotto(numberOfLottoTickets, purchasedLottoTickets);
  };

  const renderPurchasedLotto = (
    numberOfLottoTickets,
    purchasedLottoTickets,
  ) => {
    $purchasedLottoCount.innerText = numberOfLottoTickets;

    const lottoTemplate = purchasedLottoTickets
      .map(
        lotto => `
          <li class="mx-1 text-4xl lotto-item">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-numbers numbers-closed">${[...lotto].join(
              ", ",
            )}</span>
          </li>
        `,
      )
      .join("");

    $lottoList.innerHTML = lottoTemplate;
  };

  const initEventListeners = () => {
    $showResultButton.addEventListener("click", onModalShow);
    $modalClose.addEventListener("click", onModalClose);
    $purchaseButton.addEventListener("click", purchaseLottoTickets);
    $lottoNumbersToggleButton.addEventListener("change", lottoNumbersToggle);
    $purchasePrice.addEventListener("keypress", e => {
      if (e.key !== "Enter") {
        return;
      }
      e.preventDefault();
      purchaseLottoTickets();
    });
  };

  // todo : 당첨 번호와 보너스 번호를 입력한 뒤 결과 확인하기를 누르면 모달창이 호출되어야 한다.
  // * 결과 확인하기 버튼 클릭 이벤트 : 사용자가 입력한 당첨 번호와 보너스 번호 값을 확인하여 배열에 담고 반환한다.
  const getWinningAndBonusNumbers = () => {
    const winningAndBonusNumbers = [];
    const winningNumberElements = document.querySelectorAll('.winning-number');

    winningNumberElements.forEach(winningNumberElement => {
      winningAndBonusNumbers.push(winningNumberElement.value);
    })

    const bonusNumber = document.querySelector('.bonus-number').value;
    winningAndBonusNumbers.push(bonusNumber);
 
    return winningAndBonusNumbers;
  }

  const openResultModalButtonElement = document.querySelector('.open-result-modal-button');
  openResultModalButtonElement.addEventListener("click", getWinningAndBonusNumbers);
  


}

const app = new LottoApp();
app.init();
