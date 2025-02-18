import { promptUser } from "./common/input.js";

export async function getPurchaseAmount() {
  const input = await promptUser("구입금액을 입력해 주세요: ");
  return parseInt(input, 10);
}

export async function getWinningNumbers() {
  const input = await promptUser("당첨 번호를 입력해 주세요 (쉼표로 구분): ");
  return input.split(",").map((num) => parseInt(num.trim(), 10));
}

export async function getBonusNumber() {
  const input = await promptUser("보너스 번호를 입력해 주세요: ");
  return parseInt(input, 10);
}
