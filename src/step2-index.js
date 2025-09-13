import { submitLottoPrice, submitWinningLotto } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", async () => {
  const lottoStore = await submitLottoPrice();

  const lottoList = lottoStore.sell();
  printLottoWeb(lottoList);

  const rankList = await submitWinningLotto(lottoStore, lottoList);
  showWinningStatistics(rankList, lottoStore.rateOfReturn(rankList));
});
