import prompt from "../../utils/prompt.js";
import validation from "../../utils/validation.js";
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
        .map((number) => Number(number));

    const validate = validateNumbers;

    return await prompt({ message, format, validate });
  }

  async inputBonusNumber(winningNumbers) {
    const message = "> 보너스 번호를 입력해 주세요.\n";
    const format = (input) => Number(input.trim());
    const validate = validateBonusNumber(winningNumbers);

    return await prompt({ message, format, validate });
  }

  printStatistics(lottoStatistics) {
    console.log("당첨 통계");
    console.log("---------");

    const ranks = [
      { count: LOTTO_GAME_MATCHED_COUNT.FIFTH, rank: LOTTO_GAME_RANK.FIFTH },
      { count: LOTTO_GAME_MATCHED_COUNT.FOURTH, rank: LOTTO_GAME_RANK.FOURTH },
      { count: LOTTO_GAME_MATCHED_COUNT.THIRD, rank: LOTTO_GAME_RANK.THIRD },
      { count: LOTTO_GAME_MATCHED_COUNT.SECOND, rank: LOTTO_GAME_RANK.SECOND },
      { count: LOTTO_GAME_MATCHED_COUNT.FIRST, rank: LOTTO_GAME_RANK.FIRST },
    ];

    const result = ranks
      .map(({ count, rank }) => {
        const prize = LOTTO_GAME_PRIZE[rank].toLocaleString();
        const numberOfWinners = lottoStatistics[rank].count;
        return `${count}개 일치 (${prize}원) - ${numberOfWinners}개`;
      })
      .join("\n");

    console.log(result);
  }

  printRatio(ratio) {
    console.log(`총 수익률은 ${ratio.toFixed(1)}%입니다.`);
  }

  async inputRestart() {
    const message = "> 다시 시작하시겠습니까? (y/n)\n";
    const format = (input) => input.trim();
    const validate = validation.isIncluded(["y", "n"]);

    return await prompt({ message, format, validate });
  }
}

export default LottoGameView;
