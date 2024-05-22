import { Lotto, LottoMachine } from "./js/domain/index.js";
import { Input, Output } from "./js/view/index.js";

const money = await Input.getMoney();
const lottoMachine = new LottoMachine();
lottoMachine.buy(money);

const winningNumbers = new Lotto(await Input.getWinningNumbers());
const bonusNumber = await Input.getBonusNumber();

const winningLotto = lottoMachine.generateWinningLotto(winningNumbers, bonusNumber);
const lottoResult = lottoMachine.getLottoResult(winningLotto);

Output.printLottoStatistics(lottoResult);
