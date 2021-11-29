import LottoPaymentForm from "./components/LottoPaymentForm.js";
import LottoTickets from "./components/LottoTickets.js";
import { CLASS_NAME, INPUT_NAME } from "./constants/selectors.js";

const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

const lottoPaymentForm = new LottoPaymentForm(
  document.querySelector(CLASS_NAME.PAYMENT_FORM),
  INPUT_NAME.PAYMENT_INPUT
);
const lottoTickets = new LottoTickets(
  document.querySelector(CLASS_NAME.TICKET_CONTAINER),
  document.querySelector(CLASS_NAME.LOTTO_PURCHASE_STATUS),
  document.querySelector(CLASS_NAME.LOTTO_NUMBER_TOGGLE_BUTTON)
);

lottoPaymentForm.init();
lottoTickets.init();
