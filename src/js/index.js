import User from "./model/User.mjs";
import PurchaseForm from "./viewModel/PurchaseForm.mjs";
import LottoHistory from "./viewModel/LottoHistory.mjs";
import WinningNumberForm from "./viewModel/WinningNumbersForm.mjs";
import StatisticsModal from "./viewModel/StatisticsModal.mjs";

const $app = document.querySelector("#app");

function addAppEventListener() {
  const user = new User();
  const statisticsModal = new StatisticsModal();
  const lottoHistory = new LottoHistory();
  const puchaseForm = new PurchaseForm({
    user,
    lottoHistory,
  });
  const winningNumberForm = new WinningNumberForm(statisticsModal, user);
}

if ($app) {
  addAppEventListener();
} else {
  alert("앱을 찾을 수 없습니다.");
}
