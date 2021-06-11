import {$} from './utils/selector.js';
import {AmountForm} from './components/AmountForm.js';
import {LottoNumbers} from './components/LottoNumbers.js';
import {LottoResult} from './components/LottoResult.js';

export function LottoApp($el) {
    /**
     * @typedef State
     * @type {Object}
     * @property {Number} amount
     * @property {} lottoNumbers
     */
    let state = {
        amount: 0,
        lottoNumbers: [],
    };

    /**
     * @param {State} nextState
     */
    const setState = (nextState) => {
        state = {
            ...state,
            ...nextState,
        };
        console.log('state: ', state);
        render();
    };

    const setAmount = (amount) => {
        setState({amount});
    };

    const render = () => {
        const {amount, lottoNumbers} = state;
        const isReadyGame = lottoNumbers.length > 0;

        $el.innerHTML = `
			<div class="p-3">
				<div class="d-flex justify-center mt-5">
					<div class="w-100">
						<h1 class="text-center">🎱 행운의 로또</h1>
						<section data-component="amountForm"></section>
						<section data-component="lottoNumbers"></section>
						<section data-component="lottoResult"></section>
					</div>
				</div>

				<div class="modal">
					<div class="modal-inner p-10">
						<div class="modal-close">
							<svg viewbox="0 0 40 40">
								<path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
							</svg>
						</div>

						<h2 class="text-center">🏆 당첨 통계 🏆</h2>
						<div class="d-flex justify-center">
							<table class="result-table border-collapse border border-black">
								<thead>
								<tr class="text-center">
									<th class="p-3">일치 갯수</th>
									<th class="p-3">당첨금</th>
									<th class="p-3">당첨 갯수</th>
								</tr>
								</thead>
								<tbody>
								<tr class="text-center">
									<td class="p-3">3개</td>
									<td class="p-3">5,000</td>
									<td class="p-3">n개</td>
								</tr>
								<tr class="text-center">
									<td class="p-3">4개</td>
									<td class="p-3">50,000</td>
									<td class="p-3">n개</td>
								</tr>
								<tr class="text-center">
									<td class="p-3">5개</td>
									<td class="p-3">1,500,000</td>
									<td class="p-3">n개</td>
								</tr>
								<tr class="text-center">
									<td class="p-3">5개 + 보너스볼</td>
									<td class="p-3">30,000,000</td>
									<td class="p-3">n개</td>
								</tr>
								<tr class="text-center">
									<td class="p-3">6개</td>
									<td class="p-3">2,000,000,000</td>
									<td class="p-3">n개</td>
								</tr>
								</tbody>
							</table>
						</div>
						<p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
						<div class="d-flex justify-center mt-5">
							<button type="button" class="btn btn-cyan">다시 시작하기</button>
						</div>
					</div>
				</div>
			</div>
        `;

        new AmountForm($({selector: '[data-component="amountForm"]', parent: $el}), {setAmount});
        amount && new LottoNumbers($({selector: '[data-component="lottoNumbers"]', parent: $el}));
        isReadyGame && new LottoResult($({selector: '[data-component="lottoResult"]', parent: $el}));
    };

    render();
}
