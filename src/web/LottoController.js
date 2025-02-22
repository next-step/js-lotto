import LottoMachine from "../domain/LottoMachine.js";
import LottoConfirmation from "../domain/LottoConfirmation.js";
import PrizeLotto from "../domain/PrizeLotto.js";
import RenderPage from "./RenderPage.js";

class LottoController {

    #renderPage;
    #lottoMachine;

    init() {
        this.#renderPage = new RenderPage();
    }

    inputMoney(money) {
        this.#renderPage.clearInput();
        this.#renderPage.renderLottoList(this.#buyLottoByLottoMachine(money));
    }

    confirmPrize(prizeNum, bonusNum) {
        return this.#confirmLottoPrize(prizeNum, bonusNum);
    }

    #confirmLottoPrize(prizeNum, bonusNum) {
        const prizeNum = Array.from(elements.getWinningNumber()).map(num => Number(num.value));
        const bonusNum = elements.getBonusNumElements().value;

        const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
        return new LottoConfirmation(this.#lottoMachine.lottos, prizeLotto);
    }

    #buyLottoByLottoMachine(money) {
        this.#lottoMachine = new LottoMachine(money);
        this.#lottoMachine.buyAuto();
    };
};

export default LottoController;
