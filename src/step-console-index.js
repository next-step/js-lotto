/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import Lotto from "./domain/Lotto";
import LottoMachine, { LOTTO_PRICE } from "./domain/LottoMachine";
import LottoNumber from "./domain/LottoNumber";
import LottoPool from "./domain/LottoPool";
import LottoStats from "./domain/LottoStats";
import Money from "./domain/Money";
import { PRIZE } from "./domain/Prize";
import WinningLotto from "./domain/WinningLotto";
import { readLineAsync } from "./util/readLine";

const RESTART_PLAY = "y";
const RESTART_NOT_PLAY = "N";

async function inputPrice() {
  // 구매할 금액 입력
  try {
    const inputAmount = await readLineAsync("구입금액을 입력해 주세요. > ");
    const lottoPayment = new Money(inputAmount);

    return lottoPayment;
  } catch (error) {
    console.log(error.message);
    return await inputPrice();
  }
}

async function buyLotto(pay) {
  // 금액에 대한 로또 발행
  const lottoMachine = new LottoMachine(LOTTO_PRICE);

  const lottoList = lottoMachine.buyLottoList(pay);
  return lottoList;
}

async function printLottoList(lottoList) {
  console.log(`${lottoList.length}개를 구매했습니다.`);

  const lotto = lottoList.map((lotto) => {
    return lotto.numbers.map((lottoNumber) => {
      return lottoNumber.number;
    });
  });
  console.log(lotto);
}

async function inputWinningLotto() {
  // 당첨 번호 발행
  const winningLottoNumbers = await readLineAsync(
    "당첨 번호를 입력해주세요. > "
  );
  const bonusLottoNum = await readLineAsync("보너스 번호를 입력해주세요. > ");

  const winningNumberList = winningLottoNumbers
    .toString()
    .split(",")
    .map((number) => LottoPool.generateLottoNumber(Number(number)));

  try {
    const winningLotto = new WinningLotto(
      new Lotto(winningNumberList),
      LottoPool.generateLottoNumber(bonusLottoNum)
    );
    return winningLotto;
  } catch (error) {
    console.log(error.message);
    return await inputWinningLotto();
  }
}
async function prize(winningLotto, lottoList) {
  // 당첨 결과
  const prizeList = winningLotto.getResultPrize(lottoList);

  const stats = new LottoStats(prizeList);

  return stats;
}
async function resultPrize(stats, pay) {
  // 결과 그리기
  console.log("당첨 통계");
  console.log("---------------");
  Object.entries(PRIZE)
    .reverse()
    .forEach(([key, value]) =>
      console.log(
        `${value.matchCount}개 일치 (${value.prize}원) - ${
          stats.stats[value.rank]
        }개`
      )
    );

  console.log(`총 수익률은${stats.totalReturn(pay)}`);
}

async function isRestart() {
  // 재시작을 물어본다
  const restartYesOrNo = await readLineAsync(
    "다시 시작하시겠습니까? (y/n)  > "
  );

  return restartYesOrNo.toLowerCase() === RESTART_PLAY ? true : false;
}

async function play() {
  // 1. 구매할 금액입력
  // 2. 금액에 대한 로또 발행
  // 3. 당청번호 발행
  // 4. 당첨 결과
  // 5. 결과 그리기
  const price = await inputPrice();
  const lottoList = await buyLotto(price);

  printLottoList(lottoList);

  const winningLottoNumber = await inputWinningLotto(lottoList);
  const stats = await prize(winningLottoNumber, lottoList);
  const result = await resultPrize(stats, price);
}

async function playLotto() {
  do {
    await play();
  } while (await isRestart());
}

playLotto();
