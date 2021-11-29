import RenderService from '../services/RenderService.js';
import {$, $$} from '../utils/element.js';
import LottoService, {COUNT_LOTTO_NUMBERS_PER_TICKET, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../services/LottoService.js';

/**
 * @typedef {Object} WinningNumbers
 * @property {number[]} normalNumbers
 * @property {number} bonusNumber
 */

/**
 * @param $el
 * @param props
 * @param {function} props.pickWinningNumbers
 * @constructor
 */
export const WinningNumbersForm = ($el, props) => {

    function onSubmitWinningNumbers(event) {
        event.preventDefault();

        const normalNumbers = [...$$('[data-winning-number="normal"]', event.target)].map(({value}) => value);
        const bonusNumber = $('[data-winning-number="bonus"]', event.target).value;

        if (!LottoService.validateWinningNumber({normalNumbers, bonusNumber})) {
            return;
        }

        props.pickWinningNumbers({
            normalNumbers: normalNumbers.map(Number),
            bonusNumber: Number(bonusNumber),
        });
    }

    const normalNumberInputs = Array.from({length: COUNT_LOTTO_NUMBERS_PER_TICKET}).map(() => (`
        <input
            type="number"
            class="winning-number mx-1 text-center"
            data-winning-number="normal"
            min="${MIN_LOTTO_NUMBER}"
            max="${MAX_LOTTO_NUMBER}"
            required
        />
    `)).join('');

    RenderService.render({
        $el,
        template: `
            <form class="mt-9">
                <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
                <div class="d-flex">
                    <div>
                    <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                    <div>
                        ${normalNumberInputs}
                    </div>
                    </div>
                    <div class="bonus-number-container flex-grow">
                        <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                        <div class="d-flex justify-center">
                            <input 
                                type="number" 
                                class="bonus-number text-center" 
                                data-winning-number="bonus"
                                min="${MIN_LOTTO_NUMBER}"
                                max="${MAX_LOTTO_NUMBER}"
                                required
                            />
                        </div>
                    </div>
                </div>
                <button
                  type="submit"
                  class="open-result-modal-button mt-5 btn btn-cyan w-100"
                >
                    결과 확인하기
                </button>
            </form>
        `,
        eventListenerModels: [
            {
                selector: 'form',
                eventType: 'submit',
                callback: onSubmitWinningNumbers,
            },
        ],
    })
}
