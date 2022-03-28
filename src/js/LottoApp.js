import { createLottos } from "./Lotto.js";
import { PRICE_PER_LOTTO } from "./constants.js";

export default function LottoApp() {
  this.init = () => {
    initEventListeners();
    this.purchasePrice = 0;
    this.lottoTickets = [];
    this.winningLotto = {
      winningNumbers: [],
      bonusNumber: 0,
    };
  };

  this.reset = () => {
    onModalClose();
    clearWinningAndBonusNumber();
    beforePurchaseLottoView();
    this.purchasePrice = 0;
    this.lottoTickets = [];
    this.winningLotto = {
      winningNumbers: [],
      bonusNumber: 0,
    };
  };

  const clearWinningAndBonusNumber = () => {
    winningNumberElements.forEach(winningNumberElement => {
      winningNumberElement.value = "";
    });
    bonusNumberElement.value = "";
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

  const resetPurchaseButton = document.querySelector(".reset-purchase");
  resetPurchaseButton.addEventListener("click", this.reset);

  const winningNumberElements = document.querySelectorAll(".winning-number");
  const bonusNumberElement = document.querySelector(".bonus-number");

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

  // todo: 로또를 구매하는 함수
  const purchaseLottos = () => {
    beforePurchaseLottoView();

    this.purchasePrice = Number($purchasePrice.value);

    if (!isPaymentUnitsOf1000Won(this.purchasePrice)) {
      alert("구입 금액은 1,000원 단위로 입력해 주세요.");
      $purchasePrice.value = "";
      return;
    }

    const numberOfLottoTickets = this.purchasePrice / PRICE_PER_LOTTO;
    this.lottoTickets = createLottos(numberOfLottoTickets);

    afterPurchaseLottoView();

    renderLottos(numberOfLottoTickets, this.lottoTickets);
  };

  // todo : 당첨번호,보너스 번호 중에 중복된 숫자가 있는지 유효성 검사
  const isValidWinningNumbers = () => {
    const winningNumbersAndBonus = new Set();
    winningNumberElements.forEach(winningNumberElement => {
      winningNumbersAndBonus.add(winningNumberElement.value);
    });

    winningNumbersAndBonus.add(bonusNumberElement.value);

    if (winningNumbersAndBonus.size !== 7) {
      alert("당첨 번호와 보너스 번호에는 중복된 번호가 입력될 수 없습니다.");
      return false;
    }

    return true;
  };

  // todo : 사용자가 입력한 당첨 번호와 보너스 번호 값을 확인한다.
  const createWinningLotto = () => {
    this.winningLotto.winningNumbers = Array.from(winningNumberElements).map(
      winningNumberElement => Number(winningNumberElement.value),
    );

    this.winningLotto.bonusNumber = Number(bonusNumberElement.value);
  };

  // todo : 당첨 결과를 저장할 객체 (등수별로 로또 갯수와 당첨 금액)
  this.lottoPrizes = {
    FIRST: {
      count: 0,
      prize: 2_000_000_000,
    },
    SECOND: {
      count: 0,
      prize: 30_000_000,
    },
    THIRD: {
      count: 0,
      prize: 1_500_000,
    },
    FOURTH: {
      count: 0,
      prize: 50_000,
    },
    FIFTH: {
      count: 0,
      prize: 5000,
    },
  };

  // todo : '결과 확인하기' 버튼 클릭
  const getWinningResult = () => {
    // todo : 지난주 당첨번호 및 보너스 번호 확인
    if (!isValidWinningNumbers()) {
      onModalClose();
      return;
    }

    createWinningLotto();

    this.lottoTickets.map(lotto => {
      let matchingCount = 0;
      let isMatchBonus = false;

      // todo : 내가 산 로또마다 당첨번호랑 일치하는 갯수가 몇개인지 체크.
      this.winningLotto.winningNumbers.forEach(winningNumber => {
        if (lotto.numbers.has(winningNumber)) {
          matchingCount += 1;
        }
      });

      // todo : 내가 산 로또 중에 보너스 번호와 일치하는 티켓이 있는지 확인
      if (lotto.numbers.has(this.winningLotto.bonusNumber)) {
        isMatchBonus = true;
      }

      // todo : 번호일치갯수 + 보너스일치유무로 등수 확인
      if (matchingCount === 6) {
        this.lottoPrizes.FIRST.count += 1;
      }
      if (matchingCount === 5 && isMatchBonus === true) {
        this.lottoPrizes.SECOND.count += 1;
      }
      if (matchingCount === 5) {
        this.lottoPrizes.THIRD.count += 1;
      }
      if (matchingCount === 4) {
        this.lottoPrizes.FOURTH.count += 1;
      }
      if (matchingCount === 3) {
        this.lottoPrizes.FIFTH.count += 1;
      }
    });

    // todo : 당첨금 계산
    const prizeKeys = Object.keys(this.lottoPrizes);
    let totalPrize = 0;

    prizeKeys.forEach(prizeKey => {
      totalPrize +=
        this.lottoPrizes[prizeKey].count * this.lottoPrizes[prizeKey].prize;
    });

    // todo : 수익률 계산 = 당첨금 / 구매금액
    const earningRate = totalPrize / this.purchasePrice;

    // todo : 화면에 렌더링
    document.querySelector(".first-prize-count").innerText =
      this.lottoPrizes.FIRST.count;
    document.querySelector(".second-prize-count").innerText =
      this.lottoPrizes.SECOND.count;
    document.querySelector(".third-prize-count").innerText =
      this.lottoPrizes.THIRD.count;
    document.querySelector(".fourth-prize-count").innerText =
      this.lottoPrizes.FOURTH.count;
    document.querySelector(".fifth-prize-count").innerText =
      this.lottoPrizes.FIFTH.count;
    document.querySelector(".earning-rate").innerText = earningRate;
  };
}
