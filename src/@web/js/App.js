import MoneyInputForm from "./components/MoneyInputForm";
import LottoListContainer from "./components/LottoListContainer";
import {LOTTO_INFO} from "../../consts/Lotto";
import LottoFactory from "../../domain/LottoFactory/LottoFactory";

export default class App {
    #moneyInputForm;
    #lottoListContainer;


    constructor() {
        this.#moneyInputForm = new MoneyInputForm({ $target: document.querySelector('#money-input-form'), onSubmit: this.#onSubmitMoneyInputForm.bind(this) });
        this.#lottoListContainer = new LottoListContainer({ $target: document.querySelector('#lotto-list-container') });
    }

    #onSubmitMoneyInputForm({money}) {
        const lottoList = this.#makeLotto(money);
        this.#lottoListContainer.setState({ lottoList });
        this.#lottoListContainer.render();
    }

    #makeLotto(money) {
        const lottoCount = money / LOTTO_INFO.PRICE;
        return LottoFactory.createLottoList(lottoCount);
    }
}