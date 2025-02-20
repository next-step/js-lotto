import LottoMachine from "../domain/LottoMachine.js";
import LottoConfirmation from "../domain/lottoConfirmation.js";
import PrizeLotto from "../domain/PrizeLotto.js";
import RenderPage from "./RenderPage.js";
import  * as elements from "./Elements.js";

class LottoController {

    #lottoMachine;
    #renderPage;

    init() {
        this.initInputMoney();
        this.initContrimPrize();
        this.initRestart();
        this.initClose();
        this.#renderPage = new RenderPage();
    }

    initInputMoney() {
        elements.getBuyButtonElements().addEventListener('click', () => {
            this.buyLottoByLottoMachine();
            this.#renderPage.renderLottoList(this.#lottoMachine);
        });
    }

    initContrimPrize() {
        elements.getConfirmButtonElements().addEventListener('click', () => {
            this.#renderPage.openModal(this.confirmLottoPrize());
        });
    }

    initRestart() {
        elements.getRestartButtonElements().addEventListener('click', () => {
            this.#renderPage.closeModal();
            this.#renderPage.clearInput();
        });
    }

    initClose() {
        elements.getRestartButtonElements().addEventListener('click', () => {
            this.#renderPage.closeModal();
        });
    }

    confirmLottoPrize() {
        const prizeNum = Array.from(elements.getWinningNumber()).map(num => Number(num.value));
        const bonusNum = elements.getBonusNumElements().value;

        const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
        return new LottoConfirmation(this.#lottoMachine.lottos, prizeLotto);
    }

    buyLottoByLottoMachine() {
        const money = elements.getMoneyElements().value;
        this.#renderPage.clearInput();

        this.#lottoMachine = new LottoMachine(money);
        this.#lottoMachine.buyAuto();
    };
};

export default LottoController;
