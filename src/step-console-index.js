/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import Lotto from "./domain/Lotto";
import WinningLotto from "./domain/WinningLotto";
import { readLineAsync } from "./util/readLine";

async function play() {
  const pay = await readLineAsync("구입금액을 입력해 주세요. > ");

  const buyLottoCount = Math.floor(pay / 1000); //정수가 아닐경우,

  console.log(`${buyLottoCount}개를 구매했습니다.`);

  const arrayLotto = Array.from({ length: buyLottoCount }, () => {
    const lotto = new Lotto();
    console.log(lotto.number);

    return lotto.number;
  });

  const winningLotto = await readLineAsync("당첨 번호를 입력해주세요. > ");
  const bonusLottoNum = await readLineAsync("보너스 번호를 입력해주세요. > ");

  const winningNum = new WinningLotto(
    winningLotto.split(",").map(Number),
    bonusLottoNum
  );

  const stats = arrayLotto.map((lotto) =>
    lotto.filter((x) => winningNum.number.includes(x))
  );

  const rank = winningNum.countLotto(stats);

  console.log("당첨 통계");
  console.log("---------------");
  console.log(`3개 일치 (5,000원) - ${rank.fifth}개`);
  console.log(`4개 일치 (50,000원) - ${rank.fourth}개`);
  console.log(`5개 일치 (1,500,000원) - ${rank.third}개`);
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rank.second}개`);
  console.log(`6개 일치 (2,000,000,000원) - ${rank.first}개`);

  console.log(`총 수익률은${winningNum.totalReturn(pay)}`);
}

play();
