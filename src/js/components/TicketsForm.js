import RenderService from '../services/RenderService.js';
import LottoService, {COUNT_LOTTO_NUMBERS_PER_TICKET, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER} from '../services/LottoService.js';
import {$$} from '../utils/element.js';

/**
* @param $el
* @param props
* @param {number} props.balance
* @param {function} props.manualPurchaseTicket
* @param {function} props.autoPurchaseTickets
*/
export const TicketsForm = ($el, props) => {

    if (!props.balance) {
        RenderService.render({$el, template: ''});
        return;
    }

    function onSubmitTicketsForm(event) {
        event.preventDefault();

        const ticketNumbers = [...$$('[data-ticket-number]', event.target)].map(({value}) => Number(value));
        if (!LottoService.validateLottoNumber({normalNumbers: ticketNumbers})) {
            return;
        }

        props.manualPurchaseTicket({
            normalNumbers: ticketNumbers,
        });
    }

    function onClickAutoPurchase() {
        props.autoPurchaseTickets(props.balance);
    }

    const ticketNumberInputs = Array.from({length: COUNT_LOTTO_NUMBERS_PER_TICKET}).map(() => (`
        <input
            type="number"
            class="winning-number mx-1 text-center"
            data-ticket-number
            min="${MIN_LOTTO_NUMBER}"
            max="${MAX_LOTTO_NUMBER}"
            required
        />
    `)).join('');

    RenderService.render({
        $el,
        template: `
            <form class="mt-9">
                <label class="flex-auto d-inline-block mb-3">구입하실 로또 번호를 입력해주세요. 잔액: ${props.balance}원</label>
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
                >
                    구입하기
                </button>
            </form>
            <button
              type="button"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
              data-click="auto-purchase"
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
};
