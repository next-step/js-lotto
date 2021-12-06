import RenderService from '../services/RenderService.js';
import LottoService, {COUNT_LOTTO_NUMBERS_PER_TICKET, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../services/LottoService.js';
import {$$} from '../utils/element.js';
import {PRICE_PER_TICKET} from '../consts.js';

/**
* @param $el
* @param props
* @param {number} props.amount
* @param {function} props.purchaseTickets
*/
export const TicketsForm = ($el, props) => {

    const state = {
        balance: props.amount,
    };

    function onSubmitTicketsForm(event) {
        event.preventDefault();

        const ticketNumbers = [...$$('[data-ticket-number]', event.target)].map(({value}) => Number(value));
        if (!LottoService.validateLottoNumber({normalNumbers: ticketNumbers})) {
            return;
        }

        props.purchaseTickets([
            {
                normalNumbers: ticketNumbers,
            },
        ]);

        state.balance -= PRICE_PER_TICKET;
        render();
    }

    function onClickAutoPurchase() {
        props.purchaseTickets(LottoService.autoGenerateLottoNumbers(state.balance / PRICE_PER_TICKET));

        state.balance = 0;
        render();
    }

    function render() {
        const isZeroBalance = !state.balance;
        const ticketNumberInputs = Array.from({length: COUNT_LOTTO_NUMBERS_PER_TICKET}).map(() => (`
            <input
                type="number"
                class="winning-number mx-1 text-center"
                data-ticket-number
                min="${MIN_LOTTO_NUMBER}"
                max="${MAX_LOTTO_NUMBER}"
                required
                ${isZeroBalance ? 'disabled' : ''}
            />
        `)).join('');

        RenderService.render({
            $el,
            template: `
            <form class="mt-9">
                <label class="flex-auto d-inline-block mb-3">구입하실 로또 번호를 입력해주세요. 잔액: ${state.balance}원</label>
                <div class="d-flex">
                    <div>
                        <h4 class="mt-0 mb-3 text-center">로또 번호</h4>
                        <div>
                            ${ticketNumberInputs}
                        </div>
                    </div>
                </div>
                <button
                  type="submit"
                  class="open-result-modal-button mt-5 btn btn-cyan w-100"
                  ${isZeroBalance ? 'disabled' : ''}
                >
                    구입하기
                </button>
            </form>
            <button
              type="button"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
              data-click="auto-purchase"
              ${isZeroBalance ? 'disabled' : ''}
            >
                남는금액 자동 구입하기
            </button>
        `,
            eventListenerModels: [
                {
                    selector: 'form',
                    eventType: 'submit',
                    callback: onSubmitTicketsForm,
                },
                {
                    selector: '[data-click="auto-purchase"]',
                    eventType: 'click',
                    callback: onClickAutoPurchase,
                },
            ],
        });
    }

    render();
};
