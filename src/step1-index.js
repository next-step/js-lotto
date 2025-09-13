/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  const purchaseAmountString = await rl.question(
    "> 구입금액을 입력해 주세요. "
  );
  console.log(`구입 금액: ${purchaseAmountString}원`);
  console.log("%%개를 구매했습니다."); //TODO: 구입 금액에 해당하는 만큼 발행한 로또 개수를 출력하도록 변경해야합니다.

  console.log("");
  const lottoNumberString = await rl.question("> 당첨 번호를 입력해 주세요. ");
  console.log(`당첨 번호: ${lottoNumberString}`); //TODO: 입력 테스트 용으로 제거해야합니다.

  console.log("");
  const bonusNumberString = await rl.question(
    "> 보너스 번호를 입력해 주세요. "
  );
  console.log(`보너스 번호: ${bonusNumberString}`); //TODO: 입력 테스트 용으로 제거해야합니다.

  //TODO: 출력 테스트 용으로 실제 결과물의 출력으로 변경해야 합니다. START
  console.log("");
  console.log("당첨 통계");
  console.log("--------------------");
  console.log("3개 일치 (5,000원) - 1개");
  console.log("4개 일치 (50,000원) - 0개");
  console.log("5개 일치 (1,500,000원) - 0개");
  console.log("5개 일치, 보너스 볼 일치 (30,000,000원) - 0개");
  console.log("6개 일치 (2,000,000,000원) - 0개");
  console.log("총 수익률은 62.5%입니다.");
  //TODO: 출력 테스트 용으로 실제 결과물의 출력으로 변경해야 합니다. END

  rl.close();
};

main();
