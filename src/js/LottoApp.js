import { createLottos } from "./createLotto.js";
import { PRICE_PER_LOTTO } from "./constants.js";

export default function LottoApp() {
  this.lottoTickets = [];
  this.winningLotto = {
    winningNumbers: [],
    bonusNumber: 0,
  };

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
  const openResultModalButtonElement = document.querySelector(
    ".open-result-modal-button",
  );

  const onModalShow = () => {
    $modal.classList.add("open");
  };

  const onModalClose = () => {
    $modal.classList.remove("open");
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

  const verticalLottoListView = () => {
    $lottoList.classList.add("flex-row");
    $lottoList.classList.remove("flex-col");
  };

  const horizontalLottoListView = () => {
    $lottoList.classList.remove("flex-col");
    $lottoList.classList.add("flex-row");
  };

  const toggleLottoNumberSwitch = event => {
    if (event.target.checked) {
      showPurchasedLottoNumbers();
      verticalLottoListView();
    } else {
      hidePurchasedLottoNumbers();
      horizontalLottoListView();
    }
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

  const beforePurchaseLottoView = () => {
    $lottoNumbersToggleButton.checked = false;
    horizontalLottoListView();
    hidePurchaseResult();
    hideConfirmWinningNumbers();
  };

  const afterPurchaseLottoView = () => {
    showPurchaseResult();
    showConfirmWinningNumbers();
  };

  const initEventListeners = () => {
    $showResultButton.addEventListener("click", onModalShow);
    $modalClose.addEventListener("click", onModalClose);
    $purchaseButton.addEventListener("click", purchaseLottos);
    $lottoNumbersToggleButton.addEventListener(
      "change",
      toggleLottoNumberSwitch,
    );
    $purchasePrice.addEventListener("keypress", e => {
      if (e.key !== "Enter") {
        return;
      }
      e.preventDefault();
      purchaseLottos();
    });
    openResultModalButtonElement.addEventListener("click", getWinningResult);
  };

  const renderLottos = (purchasedLottoCount, purchasedLottos) => {
    $purchasedLottoCount.innerText = purchasedLottoCount;
    const lottoTemplate = purchasedLottos
      .map(
        lotto => `
          <li class="mx-1 text-4xl lotto-item">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-numbers numbers-closed">${[
              ...lotto.numbers,
            ].join(", ")}</span>
          </li>
        `,
      )
      .join("");

    $lottoList.innerHTML = lottoTemplate;
  };

  const isPaymentUnitsOf1000Won = payment => {
    if (payment % PRICE_PER_LOTTO === 0) {
      return true;
    }
    return false;
  };

  // * 로또를 구매하는 함수
  const purchaseLottos = () => {
    beforePurchaseLottoView();

    // * 사용자가 입력한 '지불 금액'이라는 의미에 맞게 이름을 수정하자.
    const paidMoney = Number($purchasePrice.value);

    if (!isPaymentUnitsOf1000Won(paidMoney)) {
      alert("구입 금액은 1,000원 단위로 입력해 주세요.");
      $purchasePrice.value = "";
      return;
    }

    // todo : 지금은 자동 구매밖에 없지만 수동 구매가 추가된다면? -> 수동 구매 후 남은 금액을 자동 구매에 사용한다.
    const numberOfLottoTickets = paidMoney / PRICE_PER_LOTTO;
    this.lottoTickets = createLottos(numberOfLottoTickets);

    afterPurchaseLottoView();

    renderLottos(numberOfLottoTickets, this.lottoTickets);
  };

  // todo : 사용자가 입력한 당첨 번호와 보너스 번호 값을 확인한다.
  const createWinningLotto = () => {
    const winningNumberElements = document.querySelectorAll(".winning-number");
    const bonusNumber = document.querySelector(".bonus-number").value;

    this.winningLotto.winningNumbers = Array.from(winningNumberElements).map(
      winningNumberElement => Number(winningNumberElement.value),
    );

    this.winningLotto.bonusNumber = Number(bonusNumber);
  };

  // todo : '결과 확인하기' 버튼 클릭
  const getWinningResult = () => {
    createWinningLotto();

    // * 사용자가 구입한 로또 확인
    console.log(this.lottoTickets);
    console.log(this.winningLotto.winningNumbers);
    console.log(this.winningLotto.bonusNumber);

    console.log("매칭 카운트 확인 시작");
    // * winningNumbers 의 요소를 순회하면서 각 lotto마다 매칭되는 번호가 몇개인지 확인해야 한다.
    const matchingInfo = this.lottoTickets.map(lotto => {
      let matchingCount = 0;
      this.winningLotto.winningNumbers.forEach(winningNumber => {
        if (lotto.has(winningNumber)) {
          matchingCount += 1;
        }
      });
      console.log(`matchingCount: ${matchingCount}`);
    });
  };
}
