/**
 * @param {Element} $el
 * @param {Object} props
 * @param {[Number]} props.winningNumber
 * @param {Number} props.bonusNumber
 * @param {Function} props.checkResult
 * @constructor
 */
import {MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../consts/lottoConsts.js';

export function LottoWinnigNumber($el, props) {

    const bindEvents = () => {
        $el.addEventListener('submit', event => {
            event.preventDefault();
            enterWinningNumber(new FormData(event.target));
        });
    };

    const enterWinningNumber = (formData) => {
        const winningNumber = [0, 1, 2, 3, 4, 5].map(index => Number(formData.get(`winningNumber${index + 1}`)));
        const bonusNumber = Number(formData.get('winningNumberBonus'));

        const deduplicatedNumbers = Array.from(new Set([...winningNumber, bonusNumber]));
        if (deduplicatedNumbers.length !== [...winningNumber, bonusNumber].length) {
            alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
            return;
        }

        props.checkResult({winningNumber, bonusNumber});
    };

    const render = () => {
        const winningNumberInputs = props.winningNumber.map((number, index) => {
            return `<input type="number" class="winning-number mx-1 text-center" name="winningNumber${index + 1}" ${number ? `value="${number}"` : ''} min="${MIN_LOTTO_NUMBER}" max="${MAX_LOTTO_NUMBER}" required />`;
        });

        $el.innerHTML = `
            <form class="mt-9" data-test="winning-number-form">
                <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
                <div class="d-flex">
                    <div>
                        <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                        <div>
                            ${winningNumberInputs.join('')}
                        </div>
                    </div>
                    <div class="bonus-number-container flex-grow">
                        <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                        <div class="d-flex justify-center">
                            <input type="number" class="bonus-number text-center" name="winningNumberBonus" ${props.bonusNumber ? `value="${props.bonusNumber}"` : ''} min="${MIN_LOTTO_NUMBER}" max="${MAX_LOTTO_NUMBER}" required >
                        </div>
                    </div>
                </div>
                <button type="submit" class="open-result-modal-button mt-5 btn btn-cyan w-100" data-test="winning-number-submit-button">
                    결과 확인하기
                </button>
            </form>
        `;
    };

    render();
    bindEvents();
}
