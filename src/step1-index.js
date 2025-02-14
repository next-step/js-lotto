import Lotto from "./lotto.js";
import {
  readLineAsync,
  getWinningNumbers,
  getBounsNumber,
} from "./getUserInput.js";
import { showLottoResult } from "../src/drawRank.js";

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const startLottoGame = async () => {
  let lotto;
  let winngNumbers = [];
  let bounsNumber;
  await readLineAsync("구입금액을 입력해 주세요 : ").then((amount) => {
    lotto = new Lotto(amount);
    lotto.makeLottoByPayment();
    for (let i = 0; i < lotto.count; i++) {
      lotto.showLottos(i);
    }
  });
  await getWinningNumbers("당첨 번호를 입력해 주세요. : ").then((numbers) => {
    winngNumbers = numbers.split(",");
  });
  await getBounsNumber("보너스 번호를 입력해 주세요. : ").then((number) => {
    bounsNumber = number;
  });

  console.log("당첨 통계");
  console.log("--------------------------");
  showLottoResult(lotto.numbers, winngNumbers, bounsNumber);
};

startLottoGame();
