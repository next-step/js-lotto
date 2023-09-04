import MoneyInputForm from "./components/MoneyInputForm";
import LottoListContainer from "./components/LottoListContainer";
import {LOTTO_INFO} from "../../consts/Lotto";
import LottoFactory from "../../domain/LottoFactory/LottoFactory";
import WinningConditionInputForm from "./components/WinningConditionInputForm";
import LottoResultReport from "../../domain/LottoResultReport/LottoResultReport";
import ResultModal from "./components/ResultModal";

export default class App {
    #moneyInputForm;
    #lottoListContainer;
    #winningConditionInputForm;
    #resultModal;


    constructor() {
        this.#moneyInputForm = new MoneyInputForm({ $target: document.querySelector('#money-input-form'), onSubmit: this.#onSubmitMoneyInputForm.bind(this) });
        this.#lottoListContainer = new LottoListContainer({ $target: document.querySelector('#lotto-list-container') });
        this.#winningConditionInputForm = new WinningConditionInputForm({ $target: document.querySelector('#winning-condition-input-form'), onSubmit: this.#onSubmitWinningNumberInputForm.bind(this) });
        this.#resultModal = new ResultModal({ $target: document.querySelector('.modal') });
    }

    #onSubmitMoneyInputForm({money}) {
        const lottoList = this.#makeLotto(money);
        this.#lottoListContainer.setState({ lottoList });
        this.#lottoListContainer.render();
        this.#winningConditionInputForm.render();
    }

    #makeLotto(money) {
        const lottoCount = money / LOTTO_INFO.PRICE;
        return LottoFactory.createLottoList(lottoCount);
    }

    #onSubmitWinningNumberInputForm({winningNumbers, bonusNumber}) {
        this.#lottoListContainer.state.lottoList.forEach((lotto) => lotto.setWinningRank(winningNumbers, bonusNumber));
        const lottoResultReport = new LottoResultReport(this.#lottoListContainer.state.lottoList);
        this.#resultModal.setState({resultSummary: lottoResultReport.getLottoResultSummary({order: 'DESC'}), profitRate: lottoResultReport.getProfitRate()});
        this.#resultModal.openModal();
    }
}