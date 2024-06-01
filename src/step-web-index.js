import Lotto from "./js/domain/Lotto.js";
import LottoShop from "./js/domain/LottoShop.js";
import LottoMachine from "./js/domain/LottoMachine.js";
import LottoRanking from "./js/domain/LottoRanking.js";
import WinningLotto from "./js/domain/WinningLotto.js";
import LottoListSection from "./js/view/web/LottoListSection.js";
import LottoRankingModal from "./js/view/web/LottoRankingModal.js";
import PurchaseAmountInputForm from "./js/view/web/PurchaseAmountInputForm.js";
import WinningLottoForm from "./js/view/web/WinningLottoForm.js";
import { $ } from "./utils/dom.js";
import LottoNumber from "./js/domain/LottoNumber.js";

let purchasedAmount;
const lottos = [];

// 로또 게임 초기화
const initializeLottoGame = () => {
  purchasedAmount = PurchaseAmountInputForm.inputValue();
  const purchasableLottosCount =
    LottoShop.getPurchasableLottoCount(purchasedAmount);
  const purchasedLottos = LottoMachine.generateRandomLottos(
    purchasableLottosCount
  );

  lottos.push(...purchasedLottos);
};

// 구매 금액 입력
const onSubmitPurchaseAmount = (e) => {
  const isValidInput = PurchaseAmountInputForm.isValidInput();
  if (!isValidInput) {
    return;
  }

  e.preventDefault();

  try {
    initializeLottoGame();
    LottoListSection.show(lottos);
    WinningLottoForm.show();
  } catch (error) {
    alert(error.message);
  }
};

let isEnterPressed = false;

PurchaseAmountInputForm.selector.PURCHASE_AMOUNT_INPUT.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      isEnterPressed = true;
      if (!PurchaseAmountInputForm.isValidInput()) {
        return;
      }
      onSubmitPurchaseAmount(e);
    }
  }
);

PurchaseAmountInputForm.selector.PURCHASE_BUTTON.addEventListener(
  "click",
  onSubmitPurchaseAmount
);

PurchaseAmountInputForm.selector.PURCHASE_AMOUNT_INPUT.addEventListener(
  "blur",
  () => {
    try {
      // Enter 키로 인한 blur 이벤트 발생 시, 중복으로 validate 되는 것을 방지
      if (isEnterPressed) {
        isEnterPressed = false;
        return;
      }

      LottoShop.validateLottoPurchasedAmount(
        PurchaseAmountInputForm.inputValue()
      );
    } catch (error) {
      alert(error.message);
    }
  }
);

// 구매한 로또 목록
const onToggleShowLottoNumbers = () => {
  LottoListSection.toggleLottoNumbers(lottos);
};

LottoListSection.selector.LOTTO_LIST_TOGGLE_BUTTON.addEventListener(
  "click",
  onToggleShowLottoNumbers
);

// 결과 확인하기
const onClickShowRanking = (e) => {
  const isValidWinningNumbers = WinningLottoForm.isValidWinningNumbers();
  const isValidBonusNumber = WinningLottoForm.isValidBonusNumber();

  if (!isValidWinningNumbers || !isValidBonusNumber) {
    return;
  }

  // prevent form submit
  e.preventDefault();

  const winningNumbers = WinningLottoForm.winningNumbers();
  const bonusNumber = WinningLottoForm.bonusNumber();

  try {
    const lotto = new Lotto(winningNumbers);
    const winningLotto = new WinningLotto(lotto, bonusNumber);
    const lottoRanking = new LottoRanking(winningLotto);

    LottoRankingModal.open();
    LottoRankingModal.render(purchasedAmount, lottos, lottoRanking);
  } catch (error) {
    alert(error.message);
  }
};

WinningLottoForm.selector.WINNING_NUMBER_INPUTS.forEach((input, i) => {
  input.addEventListener("input", (e) => {
    try {
      // LottoNumber.validateLottoNumber(e.target.value);

      if (e.target.value.length >= 2) {
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus();
        } else {
          // 마지막 입력칸일 경우 blur 이벤트 발생
          e.target.blur();
        }
      }
    } catch (e) {
      alert(e.message);
      input.value = "";
    }
  });
});

WinningLottoForm.selector.WINNING_NUMBER_INPUTS.forEach((input, i) => {
  input.addEventListener("change", (e) => {
    try {
      LottoNumber.validateLottoNumber(e.target.value);
      Lotto.validateLottoNumbers(
        WinningLottoForm.winningNumbers().filter(Boolean)
      );
    } catch (e) {
      input.focus();
      input.value = "";
      alert(e.message);
    }
  });
});

WinningLottoForm.selector.BONUS_NUMBER_INPUT.addEventListener("input", (e) => {
  try {
    LottoNumber.validateLottoNumber(e.target.value);

    if (e.target.value.length >= 2) {
      e.target.blur();
    }
  } catch (e) {
    alert(e.message);
    WinningLottoForm.selector.BONUS_NUMBER_INPUT.value = "";
  }
});

const $showResultButton = $(".open-result-modal-button");
$showResultButton.addEventListener("click", onClickShowRanking);

LottoRankingModal.selector.CLOSE_BUTTON.addEventListener(
  "click",
  LottoRankingModal.close.bind(LottoRankingModal)
);

LottoRankingModal.selector.MODAL.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    LottoRankingModal.close();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (LottoRankingModal.selector.MODAL.classList.contains("open")) {
      LottoRankingModal.close();
    }
  }
});

// 게임 다시 시작하기
const onRestartGame = () => {
  LottoRankingModal.close();
  PurchaseAmountInputForm.reset();
  LottoListSection.hide();
  LottoListSection.reset(lottos);
  WinningLottoForm.hide();
  WinningLottoForm.reset();
};

const $restartGameButton = $(".restart-game-button");
$restartGameButton.addEventListener("click", onRestartGame);
