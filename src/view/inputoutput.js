
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const INPUT_MONEY_MESSAGE = "구입금액을 입력해 주세요.";
const INPUT_PRICE_LOTTO_MESSAGE = "당첨 번호를 입력해 주세요.";
const INPUT_BONUS_LOTTO_MESSAGE = "보너스 번호를 입력해 주세요.";
const RESULT_MESSAGE = "당첨통계"
const NEW_LINE = "\n";
const LINE = "--------------------"

const THREE_MESSAGE = "3개 일치 (5,000원) - ";
const FOUR_MESSAGE = "4개 일치 (50,000원) - ";
const FIVE_MESSAGE = "5개 일치 (1,500,000원) - ";
const FIVE_BONUS_MESSAGE = "5개 일치, 보너스 볼 일치 (30,000,000원) - ";
const SIX_MESSAGE = "6개 일치 (2,000,000,000원) - ";

const COUNT_KOREAN = "개";

const RATE_OF_RETURN_MESSAGE = "총 수익률은";
const RATE_OF_RETURN_END_MESSAGE = "%입니다.";

const RESTART_MESSAGE = "다시 시작하시겠습니까? (y/n) ";

const COMMA = ",";
const YES = "y";

export const createInterface = () => {
  return readline.createInterface({ input, output })
}

export const receivedPrice = async (readline) => {
  return await readline.question(INPUT_MONEY_MESSAGE + NEW_LINE)
}

export const receivedPrizeLottoNum = async (readline) => {
  const input = await readline.question(INPUT_PRICE_LOTTO_MESSAGE + NEW_LINE);
  return splitComma(input, COMMA);
}

export const receivedBonusLottoNum = async (readline) => {
  return await readline.question(INPUT_BONUS_LOTTO_MESSAGE + NEW_LINE);
}

export const splitComma = (str, separator) => {
  return str.split(separator).map(numStr => Number(numStr.trim()));
}

export const printLottos = (lottos) => {
  for (const lotto of lottos) {
    console.log(lotto.getLottoNumbers);
  }
}

export const lottoResult = (lottoResult) => {
  console.log(NEW_LINE + RESULT_MESSAGE + NEW_LINE);
  console.log(LINE + NEW_LINE);
  printStatics(lottoResult);
}

const printStatics = (lottoResult) => {
  lottoResult.getResults.forEach((count, matchedCount) => {
    switch (matchedCount) {
      case 3:
        console.log(THREE_MESSAGE + count + COUNT_KOREAN + NEW_LINE);
        break;
      case 4:
        console.log(FOUR_MESSAGE + count + COUNT_KOREAN + NEW_LINE);
        break;
      case 5:
        console.log(FIVE_MESSAGE + count + COUNT_KOREAN + NEW_LINE);
        break;
      case 6:
        console.log(FIVE_BONUS_MESSAGE + count + COUNT_KOREAN + NEW_LINE);
        break;
      case 7:
        console.log(SIX_MESSAGE + count + COUNT_KOREAN + NEW_LINE);
        break;
      default:
        break;
    }
  });
}

export const printRateOfReturn = (rateOfReturn) => {
  console.log(RATE_OF_RETURN_MESSAGE + rateOfReturn + RATE_OF_RETURN_END_MESSAGE);
}

export const restart = async (readline) => {
  const answer = await readline.question(RESTART_MESSAGE + NEW_LINE);
  return answer.toLowerCase() === YES;
}
