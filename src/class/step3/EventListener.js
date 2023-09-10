import {
  closeResultModal,
  openResultModal,
  printPrizeInfo,
  printPurchaseInfoAndPrizeInfo,
  removePurchaseInfo,
  resetPrizeInfo,
} from "./Viewer";

export const handlePurchaseFormSubmit = (
  lottoGame,
  alertUserInputError,
  evt,
) => {
  evt.preventDefault();

  try {
    if (lottoGame.stage === "SET_PAYMENT") {
      lottoGame.issueLottoTickets(Number(evt.target[0].value));

      printPurchaseInfoAndPrizeInfo(
        lottoGame.getLottoAmount(),
        lottoGame.getLottoTickets(),
      );

      lottoGame.stage = "SET_WINNING_NUMBERS";
      return;
    }

    alert("이미 로또를 구매하였습니다.");
  } catch (e) {
    alertUserInputError(e);
  }
};

export const handlePrizeFormSubmit = (lottoGame, alertUserInputError, evt) => {
  evt.preventDefault();

  try {
    if (lottoGame.stage === "SET_PAYMENT") {
      alert("로또를 먼저 구매해 주세요");
      return;
    }

    const target = evt.target;

    const winningNumbers = Array.from(
      { length: lottoGame.getTicketNumbersLength() },
      (_, index) => target[index].value,
    )
      .filter((value) => value.trim().length > 0)
      .map(Number);

    const bonusNumber = Number(
      target[lottoGame.getTicketNumbersLength()].value,
    );

    lottoGame.setWinningNumbers(winningNumbers);

    lottoGame.setBonusNumber(bonusNumber);

    printPrizeInfo(lottoGame.getTotalPrize(), lottoGame.getProfitRatio());

    openResultModal();
  } catch (e) {
    alertUserInputError(e);
  }
};

export const handleRestartButtonClick = (lottoGame) => {
  resetPrizeInfo();
  removePurchaseInfo();
  closeResultModal();
  lottoGame.reset();
};

export const handleClickModalDimmedArea = (evt) => {
  const modalInner = document.querySelector(".modal-inner");

  if (!modalInner.contains(evt.target)) {
    closeResultModal();
  }
};
