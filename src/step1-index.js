import { inputPurchaseAmount } from "./view/input.js";

async function run() {
  const purchaseAmount = await inputPurchaseAmount();
}

run();
