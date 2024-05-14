/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import {
  printCount,
  printLottoNumber,
  printRateOfReturn,
  printStatisticsLotto,
} from "./js/view/output.js";
import { readLineAsync } from "./js/utils/readLineAsync.js";
import { LottoMachine } from "./js/domain/LottoMachine.js";
import { WinningLotto } from "./js/domain/WinningLotto.js";
import { StatisticsLotto } from "./js/domain/StatisticsLotto.js";

async function play() {
  const lottos = [];

  const purchase = await readLineAsync("> 구입금액을 입력해 주세요. ");

  const lottoMachine = new LottoMachine();
  const count = lottoMachine.calculateLottoCount(purchase);
  printCount(count);

  for (let i = 0; i < count; i++) {
    const lotto = lottoMachine.generateLottoNumber();
    printLottoNumber(lotto.getLottoNumbers());
    // 로또 어딘가에 저장
    lottos.push(lotto.getLottoNumbers());
  }

  const winningLottoNumbers = await readLineAsync(
    "\n> 당첨 번호를 입력해 주세요. "
  );

  const bonusNumber = await readLineAsync("\n> 보너스 번호를 입력해 주세요. ");

  // when
  const winningLotto = new WinningLotto(winningLottoNumbers, bonusNumber);

  const statisticsLotto = new StatisticsLotto();

  for (let i = 0; i < lottos.length; i++) {
    // 몇개 일치하는지 계산
    const matchCount = winningLotto.calculateMatchLottoCount(lottos[i]);
    statisticsLotto.statisticsLotto(matchCount, winningLotto.isMatchBonus);
  }

  // 통계 출력
  printStatisticsLotto(statisticsLotto.getPrizes());

  // 총 수익률 출력
  const rateOfReturn = statisticsLotto.calculateRateOfReturn(purchase);
  printRateOfReturn(rateOfReturn);
}

play();
