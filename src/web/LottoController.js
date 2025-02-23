import LottoMachine from "../domain/LottoMachine.js";
import LottoConfirmation from "../domain/LottoConfirmation.js";
import PrizeLotto from "../domain/PrizeLotto.js";

class LottoController {
    #lottoMachine;

    inputMoney(money) {
        this.#buyLottoByLottoMachine(money)
        return this.#lottoMachine;
    }

    confirmPrize(prizeNumber, bonusNumber) {
        return this.#confirmLottoPrize(prizeNumber, bonusNumber);
    }

    #confirmLottoPrize(prizeNumber, bonusNumber) {
        const prizeLotto = new PrizeLotto(prizeNumber, bonusNumber);
        return new LottoConfirmation(this.#lottoMachine.lottos, prizeLotto);
    }

    #buyLottoByLottoMachine(money) {
        this.#lottoMachine = new LottoMachine(money);
        this.#lottoMachine.buyAuto();
    }
}

export default LottoController;
