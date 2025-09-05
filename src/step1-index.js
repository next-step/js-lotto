import LottoGameController from "./controller/LottoGameController.js";
import ConsoleView from "./view/ConsoleView.js";

const consoleView = new ConsoleView();
const lottoController = new LottoGameController(consoleView);
lottoController.startLotto();
