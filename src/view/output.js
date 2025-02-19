export function printPurchaseResult(quantity, lottos) {
  console.log(`${quantity}개를 구매했습니다.`);
  lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
}

export function printLottoResult(results, returnRate) {
  console.log("\n당첨 통계");
  console.log("--------------------");

  results.forEach(({ requiredMatchCount, prizeMoney, matchCount }) => {
    console.log(
      `${requiredMatchCount}개 일치 (${prizeMoney.toLocaleString()}) - ${matchCount}개`
    );
  });
  console.log(`총 수익률은 ${returnRate}%입니다.`);
}
