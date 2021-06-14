/**
 * @param {Element} $el
 * @param {Object} props
 * @param {[Number]} props.lottoNumbers
 * @param {[Number]} props.winningNumber
 * @param {Number} props.bonusNumber
 *
 * @param {Function} props.closeResultModal
 * @param {Function} props.resetLotto
 * @constructor
 */
import {LOTTO_PRICE_PER_UNIT, LOTTO_RANKING, LOTTO_WINNING_AMOUNT} from '../consts/lottoConsts.js';

export function LottoResultModal($el, props) {

    const bindEvents = () => {
        $el.addEventListener('click', ({target: {dataset: {action}}}) => {
            switch (action) {
                case 'closeModal':
                    props.closeResultModal();
                    return;

                case 'restartLotto':
                    props.resetLotto();
                    return;
            }
        });
    };

    const getLottoResult = ({winningNumber, lottoNumbers, bonusNumber}) => {
        const lottoResult = {
            [LOTTO_RANKING.FIRST]: 0,
            [LOTTO_RANKING.SECOND]: 0,
            [LOTTO_RANKING.THIRD]: 0,
            [LOTTO_RANKING.FOURTH]: 0,
            [LOTTO_RANKING.FIFTH]: 0,
            [LOTTO_RANKING.ETC]: 0,
        };

        const winningNumberSet = new Set(winningNumber);
        lottoNumbers.forEach(lottoNumber => {
            const correctCount = lottoNumber.filter(number => winningNumberSet.has(number)).length;
            switch (correctCount) {
                case 3:
                    lottoResult[LOTTO_RANKING.FIFTH] += 1;
                    return;
                case 4:
                    lottoResult[LOTTO_RANKING.FOURTH] += 1;
                    return;
                case 5:
                    if (lottoNumber.includes(bonusNumber)) {
                        lottoResult[LOTTO_RANKING.SECOND] += 1;
                        return;
                    }
                    lottoResult[LOTTO_RANKING.THIRD] += 1;
                    return;
                case 6:
                    lottoResult[LOTTO_RANKING.FIRST] += 1;
                    return;

                default:
                    lottoResult[LOTTO_RANKING.ETC] += 1;
            }
        });

        return lottoResult;
    };

    const getWinningAmountRate = ({lottoResult}) => {
        const investmentAmount = LOTTO_PRICE_PER_UNIT * Object.values(lottoResult)
                                                              .reduce((prev, current) => prev + current, 0);
        const totalWinningAmount = Object.entries(lottoResult)
                                         .map(([ranking, count]) => LOTTO_WINNING_AMOUNT[ranking] * count)
                                         .reduce((prev, current) => prev + current, 0);

        return Math.round((totalWinningAmount - investmentAmount) / investmentAmount * 100);
    };

    const render = () => {
        const {winningNumber, lottoNumbers, bonusNumber} = props;
        const lottoResult = getLottoResult({winningNumber, lottoNumbers, bonusNumber});
        const winningAmountRate = getWinningAmountRate({lottoResult});

        $el.innerHTML = `
            <div class="modal open" data-test="result-modal-wrapper">
                <div class="modal-inner p-10">
                    <button type="button" class="modal-close" aria-label="close-button" data-action="closeModal" data-test="result-modal-close-button">
                        <svg viewbox="0 0 40 40">
                            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                        </svg>
                    </button>
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
                                <td class="p-3">${lottoResult[LOTTO_RANKING.FIFTH]}개</td>
                            </tr>
                            <tr class="text-center">
                                <td class="p-3">4개</td>
                                <td class="p-3">50,000</td>
                                <td class="p-3">${lottoResult[LOTTO_RANKING.FOURTH]}개</td>
                            </tr>
                            <tr class="text-center">
                                <td class="p-3">5개</td>
                                <td class="p-3">1,500,000</td>
                                <td class="p-3">${lottoResult[LOTTO_RANKING.THIRD]}개</td>
                            </tr>
                            <tr class="text-center">
                                <td class="p-3">5개 + 보너스볼</td>
                                <td class="p-3">30,000,000</td>
                                <td class="p-3">${lottoResult[LOTTO_RANKING.SECOND]}개</td>
                            </tr>
                            <tr class="text-center">
                                <td class="p-3">6개</td>
                                <td class="p-3">2,000,000,000</td>
                                <td class="p-3">${lottoResult[LOTTO_RANKING.FIRST]}개</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="text-center font-bold">당신의 총 수익률은 ${winningAmountRate}%입니다.</p>
                    <div class="d-flex justify-center mt-5">
                        <button type="button" class="btn btn-cyan" data-action="restartLotto" data-test="result-modal-restart-button">다시 시작하기</button>
                    </div>
                </div>
            </div>
        `;
    };

    render();
    bindEvents();
}
