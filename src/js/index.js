import { createLottoTickets, isValidateAmountOfPayment } from "./createLotto.js";
import { PRICE_PER_LOTTO } from "./constants.js";

function LottoApp() {
  this.init = () => {
    initEventListeners();
  };

  const $showResultButton = document.querySelector(".open-result-modal-button");
  const $modalClose = document.querySelector(".modal-close");
  const $modal = document.querySelector(".modal");
  const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");
  const $purchaseButton = document.querySelector("#purchase-button");
  const $purchaseResult = document.querySelector("#purchase-result");
  const $confirmWinningNumbers = document.querySelector("#confirm-winning-numbers");
  const $lottoList = document.querySelector(".lotto-list");

  const onModalShow = () => {
    $modal.classList.add("open");
  };

  const onModalClose = () => {
    $modal.classList.remove("open");
  };

  // * 번호보기 토글 이벤트
  const lottoNumbersToggle = event => {
    if (event.target.checked) {
      showPurchasedLottoNumbers();
      alignVerticalLottoList();
    } else {
      hidePurchasedLottoNumbers();
      alignHorizontalLottoList();
    }
  };

  // * 로또 번호 보여주기
  const showPurchasedLottoNumbers = () => {
    const lottoNumbers = document.querySelectorAll(".lotto-numbers");
    lottoNumbers.forEach(lottoNumber => {
      lottoNumber.classList.remove("numbers-closed");
    });
  };

  // * 로또 번호 가리기
  const hidePurchasedLottoNumbers = () => {
    const lottoNumbers = document.querySelectorAll(".lotto-numbers");
    lottoNumbers.forEach(lottoNumber => {
      lottoNumber.classList.add("numbers-closed");
    });
  };

  // * 로또 아이콘 정렬 : 수직 정렬
  const alignVerticalLottoList = () => {
    $lottoList.classList.remove("d-flex");
  };

  // * 로또 아이콘 정렬 : 수평 정렬
  const alignHorizontalLottoList = () => {
    $lottoList.classList.add("d-flex");
  };

  // * 구매 내역 영역을 보여준다.
  const showPurchaseResult = () => {
    $purchaseResult.classList.remove("pre-purchase");
  };

  // * 구매 내역 영역을 숨긴다.
  const hidePurchaseResult = () => {
    $purchaseResult.classList.add("pre-purchase");
  };

  // * 당첨 번호 확인 영역을 보여준다.
  const showConfirmWinningNumbers = () => {
    $confirmWinningNumbers.classList.remove("pre-purchase");
  };

  // * 당첨 번호 확인 영역을 숨긴다.
  const hideConfirmWinningNumbers = () => {
    $confirmWinningNumbers.classList.add("pre-purchase");
  };

  // * 로또 구입 전(=확인 버튼 클릭 전) 화면 초기화
  const beforePurchaseLotto = () => {
    // * 번호보기 토글 : off
    $lottoNumbersToggleButton.checked = false;
    // * 수평 정렬
    alignHorizontalLottoList();
    // * 구매 내역과 당첨번호 확인 영역을 숨긴다.
    hidePurchaseResult();
    hideConfirmWinningNumbers();
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

    const $purchasedLottoCount = document.querySelector("#purchased-lotto-count");
    $purchasedLottoCount.innerText = numberOfLottoTickets;

    const $lottoIconAndNumbers = document.querySelector("#lotto-icon-and-numbers");
    const lottoTemplate = purchasedLottoTickets
      .map(lotto => {
        return `
          <li class="mx-1 text-4xl lotto-item">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-numbers numbers-closed">${[...lotto].join(", ")}</span>
          </li>
        `;
      })
      .join("");

    $lottoIconAndNumbers.innerHTML = lottoTemplate;

    showPurchaseResult();
    showConfirmWinningNumbers();
  };

  const initEventListeners = () => {
    $showResultButton.addEventListener("click", onModalShow);
    $modalClose.addEventListener("click", onModalClose);
    $purchaseButton.addEventListener("click", purchaseLottoTickets);
    $lottoNumbersToggleButton.addEventListener("change", lottoNumbersToggle);
  };
}

const app = new LottoApp();
app.init();
