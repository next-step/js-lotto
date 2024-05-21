/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import Lotto from "./domain/Lotto";
import LottoMachine, { LOTTO_PRICE } from "./domain/LottoMachine";
import LottoStats from "./domain/LottoStats";
import WinningLotto, { PRIZE } from "./domain/WinningLotto";
import { readLineAsync } from "./util/readLine";

async function play() {
  const pay = await readLineAsync("구입금액을 입력해 주세요. > ");

  const lottoMachine = new LottoMachine(LOTTO_PRICE);
  const lottoList = lottoMachine.buyLottoList(pay);

  console.log(`${lottoList.length}개를 구매했습니다.`);
  console.log(lottoList);

  const winningLottoNumber = await readLineAsync(
    "당첨 번호를 입력해주세요. > "
  );
  const bonusLottoNum = await readLineAsync("보너스 번호를 입력해주세요. > ");

  const winningLotto = new WinningLotto(winningLottoNumber, bonusLottoNum);

  const prizeList = winningLotto.getResultPrize(lottoList);

  const stats = new LottoStats(prizeList);

  console.log("당첨 통계");
  console.log("---------------");
  console.log(
    `${PRIZE.FIFTH.matchCount}개 일치 (${PRIZE.FIFTH.prize}원) - ${
      stats.stats[PRIZE.FIFTH.rank]
    }개`
  );
  console.log(
    `${PRIZE.FOURTH.matchCount}개 일치 (${PRIZE.FOURTH.prize}원) - ${
      stats.stats[PRIZE.FOURTH.rank]
    }개`
  );
  console.log(
    `${PRIZE.THIRD.matchCount}개 일치 (${PRIZE.THIRD.prize}원) - ${
      stats.stats[PRIZE.THIRD.rank]
    }개`
  );
  console.log(
    `${PRIZE.SECOND.matchCount}개 일치, 보너스 볼 일치 (${
      PRIZE.SECOND.prize
    }원) - ${stats.stats[PRIZE.SECOND.rank]}개`
  );
  console.log(
    `${PRIZE.FIRST.matchCount}개 일치 (${PRIZE.FIRST.prize}원) - ${
      stats.stats[PRIZE.FIRST.rank]
    }개`
  );

  console.log(`총 수익률은${stats.totalReturn(pay)}`);
}

play();
