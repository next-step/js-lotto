import { LOTTO } from "./constant";
import ConsoleController from "./controller/consoleController";
import AutoLottoPrinter from "./domain/AutoLottoPrinter";
import LottoChecker from "./domain/LottoChecker";
import consoleView from "./view/consoleView";

const app = async () => {
  const autoLottoPrinter = new AutoLottoPrinter(LOTTO.PRICE_PER_LOTTO);
  const lottoChecker = new LottoChecker(LOTTO.PRIZE_INFO);
  const consoleController = new ConsoleController({
    consoleView: consoleView,
    autoLottoPrinter: autoLottoPrinter,
    lottoChecker: lottoChecker,
  });

  await consoleController.playLotto();
};

app();
