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

const controlBuyingLotto = async () => {
  try {
    const money = await askMoney();

    const lottos = buyLottos(money);
    const numbersList = getNumbersList(lottos);

    printBuyingList(numbersList);

    return lottos;
  } catch (err) {
    printError(err);
    return await controlBuyingLotto();
  }
};

const controlCompareLottos = async (lottos) => {
  try {
    const winningNumbers = await askWinningNumbers();
    const bonusNumber = await askBonusNumber();
    const lottoRanks = getLottoRanks(lottos, winningNumbers, bonusNumber);
    const stats = new LottoStats(lottoRanks);

    printStats(stats);
  } catch (err) {
    printError(err);
    await controlCompareLottos(lottos);
  }
};

const app = async () => {
  const lottos = await controlBuyingLotto();
  await controlCompareLottos(lottos);

  const wantRestart = await askRestart();
  if (wantRestart) app();
};

app();
