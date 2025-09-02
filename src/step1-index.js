import { View } from "./view/View.js";

async function main() {
  const purchasePrice = await View.read("구입금액을 입력해 주세요.");
}

main();
