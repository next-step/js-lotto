import { Lotto } from "./js/domain/Lotto.js";
import { Input, Output } from "./js/view/index.js";
import LottoMachine from "./js/domain/LottoMachine";

const money = await Input.getMoney();
const lottoMachine = new LottoMachine();
lottoMachine.buy(money);

const winningNumbers = new Lotto(await Input.getWinningNumbers());
const bonusNumber = await Input.getBonusNumber()

const winningLotto = lottoMachine.generateWinningLotto(winningNumbers, bonusNumber);
const lottoRankCounts = lottoMachine.getLottoRanks(winningLotto);
const lottoStatistics = lottoMachine.calculateLottoResult(lottoRankCounts);

Output.printLottoStatistics(lottoStatistics);
