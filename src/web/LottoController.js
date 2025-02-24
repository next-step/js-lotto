import LottoMachine from "../domain/LottoMachine.js";
import LottoConfirmation from "../domain/LottoConfirmation.js";
import PrizeLotto from "../domain/PrizeLotto.js";
import RenderPage from "./RenderPage.js";
import LottoResultItem from "./LottoResultItem.js"

class LottoController {

    #lottoMachine;
    #renderPage;

    constructor() {
        this.#renderPage = new RenderPage();
    }

    inputMoney(money) {
        this.#renderPage.clearInput();
        this.#buyLottoByLottoMachine(money);
        this.#renderPage.renderLottoList(this.#lottoMachine);
    }

    confirmPrize(prizeNumber, bonusNumber) {
        const lottoConfirmation = this.#confirmLottoPrize(prizeNumber, bonusNumber);
        const lottoResultItems = new LottoResultItem(lottoConfirmation);
        this.#renderPage.openModal(lottoResultItems);
    }

    restart() {
        this.#renderPage.closeModal();
        this.#renderPage.clearInput();
    }

    close() {
        this.#renderPage.closeModal();
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
