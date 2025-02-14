/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { buyLotto } from "./domain/buyLotto.js";
import {
  createReadlineInterface,
  getBonusNumber,
  getPurchaseAmount,
  getWinningNumbers,
} from "./view/input.js";
import { printPurchasedLottos } from "./view/output.js";

const main = async () => {
  const readline = createReadlineInterface();

  try {
    const purchaseAmount = await getPurchaseAmount(readline);
    const lottos = buyLotto(purchaseAmount);

    printPurchasedLottos(lottos);

    const winnigNumbers = await getWinningNumbers(readline);
    const bonusNumber = await getBonusNumber(readline);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.log(e.message);
  } finally {
    readline.close();
  }
};

await main();
