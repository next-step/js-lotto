import Lotto from "./js/domain/Lotto.js";
import LottoGame from "./js/domain/LottoGame.js";
import LottoMachine from "./js/domain/LottoMachine.js";
import LottoResult from "./js/domain/LottoResult.js";
import WinningLotto from "./js/domain/WinningLotto.js";
import LottoListSection from "./js/view/web/LottoListSection.js";
import LottoResultModal from "./js/view/web/LottoResultModal.js";
import PurchaseAmountInputForm from "./js/view/web/PurchaseAmountInputForm.js";
import WinningLottoForm from "./js/view/web/WinningLottoForm.js";
import { $ } from "./utils/dom.js";

const lottoGame = new LottoGame();

// 로또 게임 초기화
const initializeLottoGame = () => {
  const purchasedAmount = purchaseAmountInputForm.inputValue;
  const purchasableLottosCount =
    LottoGame.getPurchasableLottoCount(purchasedAmount);

  lottoGame.purchasedAmount = Number(purchasedAmount);
  lottoGame.lottos = LottoMachine.generateRandomLottos(purchasableLottosCount);
};

// 구매 금액 입력
const onSubmitPurchaseAmount = (e) => {
  const isValidInput = purchaseAmountInputForm.isValidInput;
  if (!isValidInput) {
    return;
  }

  e.preventDefault();

  try {
    initializeLottoGame();
    lottoListSection.show(lottoGame.lottos);
    winningLottoForm.show();
  } catch (error) {
    alert(error.message);
  }
};
const purchaseAmountInputForm = new PurchaseAmountInputForm(
  onSubmitPurchaseAmount
);

// 구매한 로또 목록
const onToggleShowLottoNumbers = () => {
  lottoListSection.toggleLottoNumbers(lottoGame.lottos);
};
const lottoListSection = new LottoListSection(onToggleShowLottoNumbers);

// 당첨 번호 입력
const winningLottoForm = new WinningLottoForm();

// 로또 결과 모달
const lottoResultModal = new LottoResultModal();

// 결과 확인하기
const onClickShowResult = (e) => {
  const isValidWinningNumbers = winningLottoForm.isValidWinningNumbers;
  const isValidBonusNumber = winningLottoForm.isValidBonusNumber;

  if (!isValidWinningNumbers || !isValidBonusNumber) {
    return;
  }

  // prevent form submit
  e.preventDefault();

  const winningNumbers = winningLottoForm.winningNumbers;
  const bonusNumber = winningLottoForm.bonusNumber;

  try {
    const lotto = new Lotto(winningNumbers);
    const winningLotto = new WinningLotto(lotto, bonusNumber);
    const lottoResult = new LottoResult(winningLotto);

    lottoResultModal.open();
    lottoResultModal.renderLottoResult(lottoGame, lottoResult);
  } catch (error) {
    alert(error.message);
  }
};

const $showResultButton = $(".open-result-modal-button");
$showResultButton.addEventListener("click", onClickShowResult);

// 게임 다시 시작하기
const onRestartGame = () => {
  lottoResultModal.close();

  purchaseAmountInputForm.reset();
  lottoListSection.hide();
  lottoListSection.reset(lottoGame.lottos);
  winningLottoForm.hide();
  winningLottoForm.reset();
};

const $restartGameButton = $(".restart-game-button");
$restartGameButton.addEventListener("click", onRestartGame);
