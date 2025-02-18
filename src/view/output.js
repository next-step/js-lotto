export function printPurchaseResult(quantity, lottos) {
  console.log(`${quantity}개를 구매했습니다.`);
  lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
}
