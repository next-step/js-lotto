import { CLASS_NAME, NUM } from '../constants/index.js';
import Lotto from '../controllers/Lotto.js';
import LottoForm from './LottoForm.js';
import LottoList from './LottoList.js';
import PurchaseForm from './PurchaseForm.js';
import ToggleButton from './ToggleButton.js';
import WinningNumberInputs from './WinningNumberInputs.js';

const initialState = {
    lottos: [],
    purchaseAmount: 0,
    purchaseCount: 0,
    rankingTable: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    profit: 0,
};

Object.freeze(initialState);

const $purchaseFormInput = document.querySelector(
    `form.${CLASS_NAME.PURCHASE_FORM} input`
);
const $section = document.querySelector('section');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $resultRows = document.querySelectorAll(
    `table.${CLASS_NAME.RESULT_TABLE} tbody tr`
);
const $lottoForm = document.querySelector(`form.${CLASS_NAME.LOTTO_FORM}`);
const $profit = document.querySelector(`p.${CLASS_NAME.PROFIT}`);
const $resetButton = document.querySelector(`button.${CLASS_NAME.RESET}`);

class App {
    state;

    constructor() {
        this.state = { ...initialState };

        this.initializeElementStyle();
        this.initializeEventListener();
        this.initializeComponents();
    }

    setRankingTable({ bonusNumber, winningNumbers }) {
        const { lottos, purchaseAmount } = this.state;

        const rankingTable = Lotto.getRankingTable({
            lottos,
            bonusNumber,
            winningNumbers,
        });
        const profit = Lotto.getProfit({
            principal: purchaseAmount,
            rankingTable,
        });

        this.setState({
            ...this.state,
            rankingTable,
            profit,
        });
    }

    purchaseLottos() {
        const purchaseAmount = Number($purchaseFormInput.value);
        const purchaseCount = Math.floor(purchaseAmount / NUM.LOTTO_PRICE);
        const lottos = Lotto.getMultipleLotto(purchaseCount);

        this.setState({
            ...this.state,
            purchaseAmount,
            purchaseCount,
            lottos,
        });
    }

    handleResetButtonClick() {
        this.setState({
            ...initialState,
        });

        this.initializeElementStyle();
        this.handleModalClose();

        $purchaseFormInput.value = '';
    }

    handleModalClose() {
        $modal.classList.remove('open');
    }

    initializeElementStyle() {
        $section.style.display = 'none';
        $lottoForm.style.display = 'none';

        $purchaseFormInput.focus();
    }

    initializeEventListener() {
        $modalClose.addEventListener('click', this.handleModalClose);
        $resetButton.addEventListener(
            'click',
            this.handleResetButtonClick.bind(this)
        );
    }

    initializeComponents() {
        PurchaseForm({ purchaseLottos: this.purchaseLottos.bind(this) });
        ToggleButton();
        LottoForm({ setRankingTable: this.setRankingTable.bind(this) });
        WinningNumberInputs();
    }

    setState(newState) {
        this.state = newState;

        this.render();
    }

    render() {
        const { rankingTable, profit } = this.state;

        const $lottoList = $section.querySelector(
            `ul.${CLASS_NAME.LOTTO_LIST}`
        );
        const $newLottoList = LottoList({ state: this.state });

        $section.replaceChild($newLottoList, $lottoList);

        $resultRows.forEach(($row, index) => {
            const $count = $row.querySelector('td:nth-of-type(3)');
            $count.textContent = `${rankingTable[5 - index]}개`;
        });

        $profit.textContent = `당신의 총 수익률은 ${profit}%입니다.`;
    }
}

export default App;
