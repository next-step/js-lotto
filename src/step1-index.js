import { View } from "./view/View.js";

async function main() {
  const purchasePrice = await View.read("구입금액을 입력해 주세요.");

  const winningNumbers = await View.read("당첨 번호를 입력해 주세요.");
  const bonusNumber = await View.read("보너스 번호를 입력해 주세요.");
}

main();
