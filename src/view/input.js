import { readLineAsync } from "../utils/readLine.js";

export async function inputPurchaseAmount() {
  return await readLineAsync("> 구입금액을 입력해 주세요. ");
}

export async function inputWinningNumber() {
  return await readLineAsync("\n> 당첨 번호를 입력해 주세요. ");
}

export async function inputBonusNumber() {
  return readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
}
