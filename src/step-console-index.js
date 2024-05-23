/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import {
  askMoney,
  printBuyingList,
  askWinningNumbers,
  askBonusNumber,
  printStats,
  askRestart,
  printError,
} from "./js/LottoView";

import {
  buyLottos,
  getNumbersList,
  getLottoRanks,
} from "./js/domain/LottoService";
import { LottoStats } from "./js/domain/LottoStats";

const repeatAskWhenError = async (ask) => {
  while (true) {
    try {
      return await ask();
    } catch (err) {
      printError(err);
    }
  }
};

const app = async () => {
  do {
    const money = await repeatAskWhenError(askMoney);

    const lottos = buyLottos(money);
    const numbersList = getNumbersList(lottos);

    printBuyingList(numbersList);

    const winningNumbers = await repeatAskWhenError(askWinningNumbers);
    const bonusNumber = await repeatAskWhenError(askBonusNumber);

    const lottoRanks = getLottoRanks(lottos, winningNumbers, bonusNumber);
    const stats = new LottoStats(lottoRanks);

    printStats(stats);
  } while (await askRestart());
};

app();
