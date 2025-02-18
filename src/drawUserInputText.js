import {
  readLineAsync,
  getWinningNumbers,
  getBonusNumber,
  IsUserRetry,
} from "../src/getUserInput.js";

export const promptBudget = async () => {
  try {
    const amount = await readLineAsync("구입금액을 입력해 주세요 : ");
    return amount;
  } catch (error) {
    console.log(error.message);
    return promptBudget();
  }
};

export const promptWinningNumbers = async () => {
  try {
    const numbers = await getWinningNumbers("당첨 번호를 입력해 주세요. : ");
    return numbers;
  } catch (error) {
    console.log(error.message);
    return promptWinningNumbers();
  }
};

export const promptBounsNumber = async () => {
  try {
    const numbers = await getBonusNumber("보너스 번호를 입력해 주세요. : ");
    return numbers;
  } catch (error) {
    console.log(error.message);
    return promptBounsNumber();
  }
};

export const promptRetry = async () => {
  try {
    const answer = await IsUserRetry("다시 시작하시겠습니까? (y/n) ");
    return answer;
  } catch (error) {
    console.log(error.message);
    return promptRetry();
  }
};
