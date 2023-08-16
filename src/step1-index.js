import lottoMachine from './js/domain/LottoMachine.js';
import View from './js/view/View.js';

const app = async () => {
  try {
    lottoMachine.purchaseLottos(await View.askPrice());
    View.printPurchasedLottos(lottoMachine.lottos);
    const winNumbers = await View.askWinNumbers();
    const bonusNumber = await View.askBonusNumber();
    lottoMachine.setWinNumbers(winNumbers, bonusNumber);
    const totalWinningResult = lottoMachine.getTotalWinningResult();
    const rateOfReturn = lottoMachine.getRateOfReturn(totalWinningResult);
    View.printResult(totalWinningResult, rateOfReturn);
    View.end();
  } catch (error) {
    View.printErrorMessage(error.message);
    View.end();
  }
};

app();
