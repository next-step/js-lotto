import User from "./model/User.mjs";
import PurchaseForm from "./viewModel/PurchaseForm.mjs";
import LottoHistory from "./viewModel/LottoHistory.mjs";
import WinningNumberForm from "./viewModel/WinningNumbersForm.mjs";
import StatisticsModal from "./viewModel/StatisticsModal.mjs";

const $app = document.querySelector("#app");

function addAppEventListener() {
  const user = new User();
  const lottoHistory = new LottoHistory();
  const purchaseForm = new PurchaseForm({
    user,
    lottoHistory,
  });
  const statisticsModal = new StatisticsModal();
  const winningNumberForm = new WinningNumberForm(statisticsModal, user);

  statisticsModal.resetButton.addEventListener("click", () => {
    statisticsModal.reset();
    user.reset();
    lottoHistory.reset();
    purchaseForm.reset();
    winningNumberForm.reset();
  });
}

if ($app) {
  addAppEventListener();
} else {
  alert("앱을 찾을 수 없습니다.");
}
