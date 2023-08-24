import createView from "./view/createView.js";
import createLotteryMachine from "./domain/LotteryMachine/createLotteryMachine.js";
import createMatchChecker from "./domain/MatchChecker/createMatchChecker.js";
import createResultChecker from "./domain/ResultChecker/createResultChecker.js";
import createRevenueCalculator from "./domain/RevenueCalculator/createRevenueCalculator.js";

const createLotteryPlatform = () => {
  let lotto = null;
  const {
    getPurchasingPriceFromView,
    getWinningLottoNumbersFromView,
    logLottoNumbers,
    logLottoStatistics,
  } = createView();
  const { issueLotto } = createLotteryMachine();
  const { setWinningLotto, checkMatch } = createMatchChecker();
  const { getResult } = createResultChecker();
  const { getRevenueOverPurchased } = createRevenueCalculator();

  function run() {
    getPurchasingPriceFromView((purchasingPrice) => {
      lotto = issueLotto(1_000);
      logLottoNumbers(lotto);

      getWinningLottoNumbersFromView((winningNumbers, bonusNumber) => {
        setWinningLotto(winningNumbers, bonusNumber);

        checkMatch(lotto);
        const revenueOverPurchased = getRevenueOverPurchased(prize, 1_000);

        logLottoStatistics(getResult(lotto), revenueOverPurchased);
      });
    });
  }

  return {
    run,
  };
};

export default createLotteryPlatform;
