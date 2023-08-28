import MoneyInputView from "./@views/InputViews/MoneyInputView/MoneyInputView.js";
import LottoAmountOutputView from "./@views/OutputViews/LottoAmountOutputView.js";
import {LOTTO_INFO} from "../consts/Lotto.js";
import LottoFactory from "../domain/LottoFactory/LottoFactory.js";
import LottoListOutputView from "./@views/OutputViews/LottoListOutputView.js";
import WinningConditionInputView from "./@views/InputViews/WinningConditionInputView/WinningConditionInputView.js";
import LottoWinningCondition from "../domain/LottoWinningCondition/LottoWinningCondition.js";
import LottoResultReport from "../domain/LottoResultReport/LottoResultReport.js";
import LottoResultOutputView from "./@views/OutputViews/LottoResultOutputView.js";
import ProfitRateOutputView from "./@views/OutputViews/ProfitRateOutputView.js";
import ReplayInputView from "./@views/InputViews/ReplayInputView/ReplayInputView.js";


class LottoGameInCli {
    async play () {
        const money = await MoneyInputView.readInput();
        const lottoAmount = money / LOTTO_INFO.PRICE;
        LottoAmountOutputView.render(lottoAmount);

        const lottoList = LottoFactory.createLottoList(lottoAmount);
        LottoListOutputView.render(lottoList);

        const {winningNumbersString,bonusNumberString} = await WinningConditionInputView.readInput();
        const lottoWinningCondition = new LottoWinningCondition(winningNumbersString, bonusNumberString);

        lottoList.forEach((lotto) => lotto.setWinningRank(lottoWinningCondition.winningNumbers, lottoWinningCondition.bonusNumber));

        const lottoResultReport = new LottoResultReport(lottoList);
        LottoResultOutputView.render(lottoResultReport.getLottoResultSummary({order:'DESC'}));
        ProfitRateOutputView.render(lottoResultReport.getProfitRate());

        const answer = await ReplayInputView.readInput();
        if (answer === 'y') {
            await this.play();
        }
        process.exit(0);
    }
}

export default LottoGameInCli;