import { Lotto, LottoMachine } from "./js/domain/index.js";
import { Input, Output } from "./js/view/index.js";

const lottoMachine = new LottoMachine();

while (lottoMachine.playable) {
  const money = await Input.getMoney();
  lottoMachine.buy(money);

  const winningNumbers = new Lotto(await Input.getWinningNumbers());
  const bonusNumber = await Input.getBonusNumber();

  const winningLotto = lottoMachine.generateWinningLotto(winningNumbers, bonusNumber);
  const lottoResult = lottoMachine.getLottoResult(winningLotto);

  Output.printLottoStatistics(lottoResult);

  lottoMachine.updatePlayableState(await Input.getPlayAgain());
}
