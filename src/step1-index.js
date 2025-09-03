import { LottoStore } from "./domain/lotto-store.js";
import { readLineAsync } from "./view/input.js";
import {
  printLotto,
  printRateOfReturn,
  printWinningStatistics,
} from "./view/output.js";

const lottoPrice = await readLineAsync("구매금액을 입력해 주세요.");
const lottoStore = new LottoStore(lottoPrice);
const lottoList = lottoStore.sell();
printLotto(lottoList);

const winningNumbersInput = await readLineAsync("당첨 번호를 입력해 주세요.");
const winningNumbers = winningNumbersInput
  .split(",")
  .map((number) => Number(number.trim()))
  .filter((number) => !isNaN(number));
const bonusNumberInput = await readLineAsync("보너스 번호를 입력해 주세요.");
const bonusNumber = Number(bonusNumberInput.trim());
const rankList = lottoList.map((lotto) =>
  lotto.prize(winningNumbers, bonusNumber)
);
printWinningStatistics(rankList);
printRateOfReturn(lottoStore.rateOfReturn(rankList));
