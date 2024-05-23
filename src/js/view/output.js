export function printCount(count) {
  console.log(`${count}개를 구매했습니다.`);
}

export function printLottoNumber(lottoNumbers) {
  console.log(lottoNumbers.sort((a, b) => a - b));
}

export function printStatisticsLotto(prizes) {
  console.log("\n당첨 통계");
  console.log("--------------------");

  console.log(
    `${prizes.FIFTH.count}개 일치 (5,000원) - ${prizes.FIFTH.count}개`
  );
  console.log(
    `${prizes.FOURTH.count}개 일치 (50,000원) - ${prizes.FOURTH.count}개`
  );
  console.log(
    `${prizes.THIRD.count}개 일치 (1,500,000원) - ${prizes.THIRD.count}개`
  );
  console.log(
    `${prizes.SECOND.count}개 일치, 보너스 볼 일치 (30,000,000원) - ${prizes.SECOND.count}개`
  );
  console.log(
    `${prizes.FIRST.count}개 일치 (2,000,000,000원) - ${prizes.FIRST.count}개`
  );
}

export function printRateOfReturn(rateOfReturn) {
  console.log(`총 수익률은 ${rateOfReturn}% 입니다.`);
}
