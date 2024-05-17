import View from "./js/domain/View";
import LottoMachine from "./js/domain/LottoMachine";
import { Lotto, WinningLotto } from "./js/domain/Lotto";

const money = await View.getMoney();
const lottoMachine = new LottoMachine();
const lottos = lottoMachine.buy(money);

const { winningNumbers, bonusNumber } = await View.getLottoNumbers();
const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
const lottoRankCounts = lottoMachine.getLottoRanks(winningLotto);
View.printLottoStatistics(lottoRankCounts);
