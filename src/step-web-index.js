import Lotto from "./js/domain/Lotto.js";
import LottoPurchaseManager from "./js/domain/LottoPurchaseManager.js";
import LottoMachine from "./js/domain/LottoMachine.js";
import LottoRanking from "./js/domain/LottoRanking.js";
import WinningLotto from "./js/domain/WinningLotto.js";
import LottoListSection from "./js/view/web/LottoListSection.js";
import LottoRankingModal from "./js/view/web/LottoRankingModal.js";
import PurchaseAmountInputForm from "./js/view/web/PurchaseAmountInputForm.js";
import WinningLottoForm from "./js/view/web/WinningLottoForm.js";
import { $ } from "./utils/dom.js";

let lottoPurchaseManager;

// 로또 게임 초기화
const initializeLottoGame = () => {
  const purchasedAmount = PurchaseAmountInputForm.inputValue();
  const purchasableLottosCount =
    LottoPurchaseManager.getPurchasableLottoCount(purchasedAmount);
  const purchasedLottos = LottoMachine.generateRandomLottos(
    purchasableLottosCount
  );

  lottoPurchaseManager = new LottoPurchaseManager(
    purchasedAmount,
    purchasedLottos
  );
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
    LottoListSection.show(lottoPurchaseManager.lottos);
    WinningLottoForm.show();
  } catch (error) {
    alert(error.message);
  }
};

PurchaseAmountInputForm.selector.PURCHASE_AMOUNT_INPUT.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
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

// 구매한 로또 목록
const onToggleShowLottoNumbers = () => {
  LottoListSection.toggleLottoNumbers(lottoPurchaseManager.lottos);
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
    LottoRankingModal.render(lottoPurchaseManager, lottoRanking);
  } catch (error) {
    alert(error.message);
  }
};

const $showResultButton = $(".open-result-modal-button");
$showResultButton.addEventListener("click", onClickShowRanking);

LottoRankingModal.selector.CLOSE_BUTTON.addEventListener(
  "click",
  LottoRankingModal.close.bind(LottoRankingModal)
);

// 게임 다시 시작하기
const onRestartGame = () => {
  LottoRankingModal.close();
  PurchaseAmountInputForm.reset();
  LottoListSection.hide();
  LottoListSection.reset(lottoPurchaseManager.lottos);
  WinningLottoForm.hide();
  WinningLottoForm.reset();
};

const $restartGameButton = $(".restart-game-button");
$restartGameButton.addEventListener("click", onRestartGame);
