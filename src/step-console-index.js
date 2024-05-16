import LottoMachine from "./js/domain/LottoMachine";
import View from "./js/domain/View";

const money = await View.getMoney();
const lottoMachine = new LottoMachine();
const lottos = lottoMachine.buy(money);

const winningNumbers = await View.getWinningNumbers();
