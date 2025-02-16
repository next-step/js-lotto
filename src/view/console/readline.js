import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const PLEASE_INPUT_WINNING_NUMBER = '> 당첨 번호를 입력해 주세요.';
export const PLEASE_INPUT_BONUS_NUMBER = '> 보너스 번호를 입력해 주세요.';


export const startProgram = () => {
  const rl = readline.createInterface({ input, output });

  return rl;
};

export const read = async (rl, message) => {
 
  const answer = await rl.question(message);
  return answer;
};

export const stopProgram = (rl) => {
  rl.close();
};
