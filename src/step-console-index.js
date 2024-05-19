import View from "./js/view/view";
import LottoMachine from "./js/domain/LottoMachine";
import { Lotto, WinningLotto } from "./js/domain/Lotto.js";

const money = await View.getMoney();
const lottoMachine = new LottoMachine();
const lottos = lottoMachine.buy(money);

const winningLotto = await View.getLottoNumbers();
// const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
const lottoRankCounts = lottoMachine.getLottoRanks(winningLotto);
View.printLottoStatistics(lottoRankCounts);
