import { lottoPriceForm, winningLottoForm } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", async () => {
  const lottoStore = await lottoPriceForm();

  const lottoList = lottoStore.sell();
  printLottoWeb(lottoList);

  const rankList = await winningLottoForm(lottoStore, lottoList);
  showWinningStatistics(rankList, lottoStore.rateOfReturn(rankList));
});
