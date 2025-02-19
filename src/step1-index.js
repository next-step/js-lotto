import { showLottoEarnings, showLottoNumbers } from "../src/drawResult.js";
import { transformUserInput } from "../src/getRank.js";
import {
  promptBudget,
  promptWinningNumbers,
  promptBounsNumber,
  promptRetry,
} from "../src/drawUserInputText.js";
import { checkResult } from "./result.js";
import Lotto from "./lotto.js";
/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const startLottoGame = async () => {
  let lotto;
  let winningNumbers = [];

  const budget = await promptBudget();
  lotto = new Lotto(budget);
  showLottoNumbers(lotto, budget);

  const userInputs = await promptWinningNumbers();
  const bounsNumber = await promptBounsNumber();

  winningNumbers = transformUserInput(userInputs, bounsNumber);

  const result = checkResult(winningNumbers, lotto);
  showLottoEarnings(result, lotto);

  const answer = await promptRetry();

  if (answer === "y") {
    startLottoGame();
  } else {
    process.exit(0);
  }
};

startLottoGame();
