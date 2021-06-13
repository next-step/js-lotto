import {$} from './utils/selector.js';
import {AmountForm} from './components/AmountForm.js';
import {LottoNumbers} from './components/LottoNumbers.js';
import {LottoWinnigNumber} from './components/LottoWinnigNumber.js';
import {LOTTO_PRICE_PER_UNIT} from './consts/lottoConsts.js';
import {pickLottoNumbers} from './utils/ticketing.js';
import {LottoResultModal} from './components/LottoResultModal.js';

export function LottoApp($el) {
    /**
     * @type {Object}
     * @property {Number} amount - 구매금액
     * @property {[[Number]]} lottoNumbers - 추첨번호[]
     * @property {[Number]} winningNumber - 당첨번호
     * @property {Boolean} showResultModal - 당첨결과 modal open 여부
     */
    let state = {
        amount: null,
        lottoNumbers: [[]],
        winningNumber: [null, null, null, null, null, null],
        bonusNumber: null,
        showResultModal: false,
    };

    const setState = (nextState) => {
        state = {
            ...state,
            ...nextState,
        };
        render();
    };

    const setAmount = (amount) => {
        const lottoNumbers = pickLottoNumbers(amount / LOTTO_PRICE_PER_UNIT);
        setState({
            amount,
            lottoNumbers,
        });
    };

    /**
     * lotto 결과확인
     * @param winningNumber
     * @param bonusNumber
     */
    const checkResult = ({winningNumber, bonusNumber}) => {
        setState({
            winningNumber,
            bonusNumber,
            showResultModal: true,
        });
    };

    const closeResultModal = () => {
        setState({
            showResultModal: false,
        });
    };

    const resetLotto = () => {
        setState({
            amount: null,
            lottoNumbers: [[]],
            winningNumber: [null, null, null, null, null, null],
            bonusNumber: null,
            showResultModal: false,
        });
    };

    const render = () => {
        const {amount, lottoNumbers, winningNumber, bonusNumber, showResultModal} = state;

        $el.innerHTML = `
			<div class="p-3">
				<div class="d-flex justify-center mt-5">
					<div class="w-100">
						<h1 class="text-center">🎱 행운의 로또</h1>
						<section data-component="amountForm"></section>
						<section data-component="lottoNumbers"></section>
						<section data-component="lottoWinningNumber"></section>
					</div>
				</div>
				<div data-component="lottoResultModal"></div>
			</div>
        `;

        new AmountForm($({selector: '[data-component="amountForm"]', parent: $el}), {amount, setAmount});
        amount && new LottoNumbers($({selector: '[data-component="lottoNumbers"]', parent: $el}), {lottoNumbers});
        amount && new LottoWinnigNumber($({selector: '[data-component="lottoWinningNumber"]', parent: $el}), {
            winningNumber,
            bonusNumber,
            checkResult,
        });

        showResultModal && new LottoResultModal($({selector: '[data-component="lottoResultModal"]', parent: $el}), {
            lottoNumbers,
            winningNumber,
            bonusNumber,
            closeResultModal,
            resetLotto,
        });
    };

    render();
}
