import { readLineAsync } from "../utils/readLine.js";

export async function inputPurchaseAmount() {
  const amount = await readLineAsync("> 구입금액을 입력해 주세요. ");
  return Number(amount);
}

export async function inputWinningNumber() {
  const numbers = await readLineAsync("\n> 당첨 번호를 입력해 주세요. ");
  return numbers.split(",").map((number) => Number(number.trim()));
}

export async function inputBonusNumber() {
  const number = await readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
  return Number(number);
}
