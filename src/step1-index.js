/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { drawLottoUI, drawLottoOutputUI } from "./console-ui/console-ui.js";
import lotto from "./lotto/lotto.js";

async function lottoProcess(store) {
  const lottos = new lotto.LottoStore(lotto.LOTTO_PRICE, lotto.Lotto).buyLottos(
    store.get("purchaseAmount")
  );
  const winningLotto = new lotto.WinningLotto(
    new lotto.Lotto(store.get("winningLottoNumber")),
    new lotto.BonusLotto(store.get("bonusNumber"))
  );

  const winningResult = lotto.LottoResultEvaluator.getWinningResult(
    winningLotto,
    lottos
  );
  const winningReport = lotto.LottoResultEvaluator.getWinningReport(
    winningResult,
    store.get("purchaseAmount")
  );
  store.set("winningReport", winningReport);
  store.set("prizeList", lotto.LottoResultEvaluator.PRIZE_LIST);
}

const main = async () => {
  try {
    const store = new Map();
    await drawLottoUI(store);
    await lottoProcess(store);
    await drawLottoOutputUI(store);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();
