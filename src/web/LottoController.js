import LottoMachine from "../domain/LottoMachine.js";
import LottoConfirmation from "../domain/LottoConfirmation.js";
import PrizeLotto from "../domain/PrizeLotto.js";
import RenderPage from "./RenderPage.js";

class LottoController {
    #lottoMachine;
    #money;

    inputMoney(money) {
        this.#buyLottoByLottoMachine(money)
        return this.#lottoMachine;
    }

    confirmPrize(prizeNum, bonusNum) {
        return this.#confirmLottoPrize(prizeNum, bonusNum);
    }

    #confirmLottoPrize(prizeNum, bonusNum) {
        const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
        return new LottoConfirmation(this.#lottoMachine.lottos, prizeLotto);
    }

    #buyLottoByLottoMachine(money) {
        this.#lottoMachine = new LottoMachine(money);
        this.#lottoMachine.buyAuto();
    }
}

export default LottoController;
