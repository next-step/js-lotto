import { $ } from "./dom.js";
import { restartLottoGame } from "./restartLottoGame.js";
import { onModalClose } from "./controlModal.js";
import { getMoneyAmount } from "./getMoneyAmount.js";

const $modalClose = $(".modal-close");
const $restartBtn = $(".btn-restart");
const $getMoneyForm = $("form.mt-5");

const init = () => {
  $getMoneyForm.addEventListener("click", getMoneyAmount);
  $modalClose.addEventListener("click", onModalClose);
  $restartBtn.addEventListener("click", restartLottoGame);
};

init();
