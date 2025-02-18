import { readLineAsync } from "../utils/readLine.js";

export async function inputPurchaseAmount() {
  return await readLineAsync("> 구입금액을 입력해 주세요.");
}
