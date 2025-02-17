/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoDraw from "./domain/LottoDraw.js";
import LottoPurchase from "./domain/LottoPurchase.js";
import Input from "./view/Input.js";
import Output from "./view/output.js";

// 당첨 번호를 받는다.
// 보너스 번호를 받는다.

// 당첨 통계 보여주기

const input = new Input();
const output = new Output();

try {
  const purchasePrice = await input.getPurchasePrice();
  const lottoPurchase = new LottoPurchase(purchasePrice);

  const lottoWinningNumbersInput = await input.getLottoWinningNumbers();
  const lottoWinningNumbers = lottoWinningNumbersInput
    .split(",")
    .map((num) => Number(num));

  const lottoBonusNumber = await input.getLottoBonusNumber();
  const lottoNumbers = {
    lottoWinningNumbers,
    lottoBonusNumber: Number(lottoBonusNumber),
  };

  const lottoDraw = new LottoDraw(lottoNumbers, lottoPurchase.lottoTickets);
  const lottoDrawResult = lottoDraw.start();
  output.printDrawResult(lottoDrawResult);
  
} catch (error) {
  output.printErrorMessage(error);
}
