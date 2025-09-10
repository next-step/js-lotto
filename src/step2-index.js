import { LottoStore } from "./domain/lotto-store.js";
import { lottoPriceForm } from "./view/input.web.js";
import { printLottoWeb } from "./view/output.web.js";

window.addEventListener("load", async () => {
  const lottoStore = await lottoPriceForm();

  const lottoList = lottoStore.sell();
  printLottoWeb(lottoList);
});
