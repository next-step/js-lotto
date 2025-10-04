import {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
} from "./component/index.js";
import lotto from "../lotto/lotto.js";

async function drawLottoUI(store) {
  await purchaseAmountComponent(store);
  await winningLottoNumberComponent(store);
  await bonusNumberComponent(store);
}

async function drawLottoOutputUI(store) {
  const lottos = new lotto.LottoStore(lotto.LOTTO_PRICE, lotto.Lotto).buyLottos(
    store.get("purchaseAmount")
  );
  const winningLotto = new lotto.WinningLotto(
    new lotto.Lotto(store.get("winningLottoNumber")),
    new lotto.BonusLotto(store.get("bonusNumber"))
  );

  const winningResult = lotto.LottoWinningRule.getWinningResult(
    winningLotto,
    lottos
  );
  const winningReport = lotto.LottoWinningRule.getWinningReport(
    winningResult,
    store.get("purchaseAmount")
  );
  store.set("winningReport", winningReport);
  await winningReportComponent(store);
}

export { drawLottoUI, drawLottoOutputUI };
