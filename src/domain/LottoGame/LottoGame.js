import {LOTTO_INFO} from "../../consts/Lotto.js";
import MoneyInputView from "../../@cli/@views/InputViews/MoneyInputView/MoneyInputView.js";
import LottoFactory from "../LottoFactory/LottoFactory.js";
import LottoWinningCondition from "../LottoWinningCondition/LottoWinningCondition.js";
import LottoResultOutputView from "../../@cli/@views/OutputViews/LottoResultOutputView.js";
import LottoAmountOutputView from "../../@cli/@views/OutputViews/LottoAmountOutputView.js";
import ProfitRateOutputView from "../../@cli/@views/OutputViews/ProfitRateOutputView.js";
import LottoListOutputView from "../../@cli/@views/OutputViews/LottoListOutputView.js";
import WinningConditionInputView
  from "../../@cli/@views/InputViews/WinningConditionInputView/WinningConditionInputView.js";
import ReplayInputView from "../../@cli/@views/InputViews/ReplayInputView/ReplayInputView.js";

class LottoGame {
  async play () {
    const money = await MoneyInputView.readInput();
    const lottoAmount = money / LOTTO_INFO.PRICE;
    LottoAmountOutputView.render(lottoAmount);

    const createdLottoList = LottoFactory.createLottoList(lottoAmount);
    LottoListOutputView.render(createdLottoList);

    const {winningNumbersString,bonusNumberString} = await WinningConditionInputView.readInput();
    const lottoWinningCondition = new LottoWinningCondition(winningNumbersString, bonusNumberString);
    createdLottoList.setWinningRank(lottoWinningCondition.winningNumbers, lottoWinningCondition.bonusNumber);

    const lottoResultSummary = createdLottoList.getLottoResultSummary({order: 'DESC'});
    LottoResultOutputView.render(lottoResultSummary);

    const profitRate = createdLottoList.getProfitRate();
    ProfitRateOutputView.render(profitRate);

    const answer = await ReplayInputView.readInput();
    if (answer === 'y') {
      await this.play();
    }
    process.exit(0);
  }
}

export default LottoGame;