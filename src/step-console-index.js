import { Input, Output } from "./js/view/index.js";
import LottoMachine from "./js/domain/LottoMachine";
import { Lotto, WinningLotto } from "./js/domain/Lotto.js";

const money = await Input.getMoney();
const lottoMachine = new LottoMachine();
const lottos = lottoMachine.buy(money);

const winningNumbers = new Lotto(await Input.getWinningNumbers());
const bonusNumber = await Input.getBonusNumber()

const winningLotto = lottoMachine.generateWinningLotto(winningNumbers, bonusNumber);
const lottoRankCounts = lottoMachine.getLottoRanks(winningLotto);
const lottoStatistics = lottoMachine.calculateLottoResult(lottoRankCounts);

Output.printLottoStatistics(lottoStatistics);
