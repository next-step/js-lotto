import prompt from "../../utils/prompt.js";
import { validateNumbers } from "../lotto/lotto.contract.js";

import {
  LOTTO_GAME_MATCHED_COUNT,
  LOTTO_GAME_PRIZE,
  LOTTO_GAME_RANK,
} from "./lotto-game.constant.js";
import { validateBonusNumber } from "./lotto-game.contract.js";

class LottoGameView {
  async inputWinningNumbers() {
    const message = "> 당첨 번호를 입력해 주세요.\n";
    const format = (input) =>
      input
        .split(",")
        .map((number) => number.trim())
        .map((number) => parseInt(number, 10));

    const validate = validateNumbers;

    return await prompt({ message, format, validate });
  }

  async inputBonusNumber() {
    const message = "> 보너스 번호를 입력해 주세요.\n";
    const format = (input) => parseInt(input, 10);
    const validate = validateBonusNumber;

    return await prompt({ message, format, validate });
  }

  printStatistics(lottoStatistics) {
    console.log("당첨 통계");
    console.log("---------");
    const result = `
${LOTTO_GAME_MATCHED_COUNT.FIFTH}개 일치 (${LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FIFTH]}) - ${lottoStatistics[LOTTO_GAME_RANK.FIFTH].count}개 \n
${LOTTO_GAME_MATCHED_COUNT.FOURTH}개 일치 (${LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FOURTH]}) - ${lottoStatistics[LOTTO_GAME_RANK.FOURTH].count}개 \n
${LOTTO_GAME_MATCHED_COUNT.THIRD}개 일치 (${LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.THIRD]}) - ${lottoStatistics[LOTTO_GAME_RANK.THIRD].count}개 \n
${LOTTO_GAME_MATCHED_COUNT.SECOND}개 일치 (${LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.SECOND]}) - ${lottoStatistics[LOTTO_GAME_RANK.SECOND].count}개 \n
${LOTTO_GAME_MATCHED_COUNT.FIRST}개 일치 (${LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FIRST]}) - ${lottoStatistics[LOTTO_GAME_RANK.FIRST].count}개 \n
    `;

    console.log(result);
  }

  printRatio(ratio) {
    console.log(`총 수익률은 ${ratio}%입니다.`);
  }
}

export default LottoGameView;
