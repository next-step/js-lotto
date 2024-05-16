import { Lotto, WinningLotto } from "./js/domain/Lotto";
import LottoMachine from "./js/domain/LottoMachine";
import View from "./js/domain/View";

const money = await View.getMoney();
const lottoMachine = new LottoMachine();
const lottos = lottoMachine.buy(money);

const { winningNumbers, bonusNumber } = await View.getLottoNumbers();
const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
const ranks = lottoMachine.getLottoRanks(winningLotto);

console.log(ranks);
