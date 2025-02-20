import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import Lotto from '../domain/Lotto.js';

class InputOutput {
  messages = {
    INPUT_MONEY: "구입금액을 입력해 주세요.",
    AUTO_MANUAL: "자동(a), 수동(b)",
    INPUT_LOTTO: "로또 번호를 입력해 주세요.",
    INPUT_PRIZE_LOTTO: "당첨 번호를 입력해 주세요.",
    INPUT_BONUS_LOTTO: "보너스 번호를 입력해 주세요.",
    INPUT_AUTO_MANUAL_EXCEPTION_MESSAGE: "자동(a), 수동(b)중 입력하십시오",
    INPUT_YES_NO_EXCEPTION_MESSAGE: "(y/n) 중 입력하십시오",
    RESULT: "당첨통계",
    NEW_LINE: "\n",
    LINE: "--------------------",
    THREE: "3개 일치 (5,000원) - ",
    FOUR: "4개 일치 (50,000원) - ",
    FIVE: "5개 일치 (1,500,000원) - ",
    FIVE_BONUS: "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
    SIX: "6개 일치 (2,000,000,000원) - ",
    COUNT_KOREAN: "개",
    RATE_OF_RETURN: "총 수익률은",
    RATE_OF_RETURN_END: "%입니다.",
    RESTART: "다시 시작하시겠습니까? (y/n)",
    COMMA: ",",
    YES: "y",
    NO: "n",
    AUTO: "a",
    MANUAL: "b"
  };

  constructor() {
    this.readline = readline.createInterface({ input, output });
  }

  async receivedPrice() {
    return await this.readline.question(this.messages.INPUT_MONEY + this.messages.NEW_LINE);
  }

  async buyAutoOrManual(lottoMachine) {
    while (true) {
      const answer = await this.readline.question(this.messages.AUTO_MANUAL + this.messages.NEW_LINE);
      try {
        return this.checkAutoOrManual(answer);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  checkAutoOrManual(answer) {
    if (answer.toLowerCase() === this.messages.AUTO) {
      return true;
    } else if (answer.toLowerCase() === this.messages.MANUAL) {
      return false;
    }
    throw new Error(this.messages.INPUT_AUTO_MANUAL_EXCEPTION_MESSAGE)
  }

  async receivedLottoNum() {
    const input = await this.readline.question(this.messages.INPUT_LOTTO + this.messages.NEW_LINE);
    return this.splitComma(input, this.messages.COMMA);
  }

  async receivedPrizeLottoNum() {
    const input = await this.readline.question(this.messages.INPUT_PRIZE_LOTTO + this.messages.NEW_LINE);
    return this.splitComma(input, this.messages.COMMA);
  }

  async receivedBonusLottoNum() {
    return await this.readline.question(this.messages.INPUT_BONUS_LOTTO + this.messages.NEW_LINE);
  }

  splitComma(str, separator) {
    return str.split(separator).map(numStr => Number(numStr.trim()));
  }

  printLottos(lottos) {
    for (const lotto of lottos) {
      console.log(lotto.getLottoNumbers);
    }
  }

  lottoResult(lottoResult) {
    console.log(this.messages.NEW_LINE + this.messages.RESULT + this.messages.NEW_LINE);
    console.log(this.messages.LINE + this.messages.NEW_LINE);
    this.printStatics(lottoResult);
  }

  printStatics(lottoResult) {
    lottoResult.getResultMap.forEach((count, matchedCount) => {
      switch (matchedCount) {
        case 3:
          console.log(this.messages.THREE + count + this.messages.COUNT_KOREAN + this.messages.NEW_LINE);
          break;
        case 4:
          console.log(this.messages.FOUR + count + this.messages.COUNT_KOREAN + this.messages.NEW_LINE);
          break;
        case 5:
          console.log(this.messages.FIVE + count + this.messages.COUNT_KOREAN + this.messages.NEW_LINE);
          break;
        case 6:
          console.log(this.messages.FIVE_BONUS + count + this.messages.COUNT_KOREAN + this.messages.NEW_LINE);
          break;
        case 7:
          console.log(this.messages.SIX + count + this.messages.COUNT_KOREAN + this.messages.NEW_LINE);
          break;
        default:
          break;
      }
    });
  }

  printRateOfReturn(rateOfReturn) {
    console.log(this.messages.RATE_OF_RETURN + rateOfReturn + this.messages.RATE_OF_RETURN_END);
  }

  async restart() {
    while (true) {
      const answer = await this.readline.question(this.messages.RESTART + this.messages.NEW_LINE);
      try {
        return this.checkYesOrNo(answer);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  checkYesOrNo(answer) {
    if (answer.toLowerCase() === this.messages.YES) {
      return true;
    } else if (answer.toLowerCase() === this.messages.NO) {
      return false;
    }
    throw new Error(this.messages.INPUT_YES_NO_EXCEPTION_MESSAGE)
  }

  closeInterface() {
    return this.readline.close();
  }
}

export default InputOutput;