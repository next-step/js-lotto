/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoDraw from "./domain/LottoDraw.js";
import LottoPurchase from "./domain/LottoPurchase.js";
import Input from "./view/Input.js";
import Output from "./view/output.js";

const input = new Input();
const output = new Output();

const executeLottoPurchase = async () => {
  try {
    const purchasePrice = await input.getPurchasePrice();
    return new LottoPurchase(purchasePrice);
  } catch (error) {
    output.printErrorMessage(error);
    return await executeLottoPurchase();
  }
};

const executeLottoDraw = async (lottoPurchase) => {
  try {
    const lottoWinningNumbersInput = await input.getLottoWinningNumbers();
    const lottoWinningNumbers = lottoWinningNumbersInput
      .split(",")
      .map((num) => Number(num));

    const lottoBonusNumber = await input.getLottoBonusNumber();
    const lottoNumbers = {
      lottoWinningNumbers,
      lottoBonusNumber: Number(lottoBonusNumber),
    };

    return new LottoDraw(lottoNumbers, lottoPurchase.lottoTickets);
  } catch (error) {
    output.printErrorMessage(error);
    return await executeLottoDraw(lottoPurchase);
  }
};

const main = async () => {
  try {
    let restart = true;

    while (restart) {
      const lottoPurchase = await executeLottoPurchase();
      output.printLottoTicketCount(lottoPurchase.lottoTickets.length);
      output.printLottoTicketsNumber(
        lottoPurchase.lottoTickets.map((ticket) => ticket.numbers)
      );

      const lottoDraw = await executeLottoDraw(lottoPurchase);
      const lottoDrawResult = lottoDraw.start();
      output.printDrawResult(lottoDrawResult);

      restart = await input.getRestart();
      restart = restart.toLowerCase() === "y";
    }
  } catch (error) {
    output.printErrorMessage(error);
  }
};

main();
