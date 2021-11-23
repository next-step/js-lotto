import {AmountForm} from './AmountForm.js';
import LottoService from '../services/LottoService.js';
import {PRICE_PER_TICKET} from '../consts.js';
import {Tickets} from './Tickets.js';
import {$} from '../utils/element.js';
import RenderService from '../services/RenderService.js';
import {WinningNumbersForm} from './WinningNumbersForm.js';
import {LottoResultModal} from './LottoResultModal.js';

export const LottoApp = ($el) => {

    /**
     * @type {{amount: number | null, tickets: Ticket[]}}
     */
    const state = {
        amount: null,
        tickets: [],
    };

    function purchaseTickets(amount) {
        state.amount = amount;
        state.tickets = LottoService.autoGenerateLottoNumbers(amount / PRICE_PER_TICKET);
        Tickets($('[data-component="tickets"]', $el), {tickets: state.tickets});
        WinningNumbersForm($('[data-component="winning-numbers-form"]', $el), {pickWinningNumbers});
    }

    function restartLotto() {
        state.amount = null;
        state.tickets = [];
        render();
    }

    /**
     * @param {WinningNumbers} winningNumbers
     */
    function pickWinningNumbers(winningNumbers) {
        LottoResultModal($('[data-component="lotto-result-modal"]', $el), {
            tickets: state.tickets,
            winningNumbers,
            restartLotto,
        });
    }

    function render() {
        RenderService.render({
            $el,
            template: `
            <div class="d-flex justify-center mt-5">
                <div class="w-100">
                    <h1 class="text-center">🎱 행운의 로또</h1>
                    <div data-component="amount-form"></div>
                    <div data-component="tickets"></div>
                    <div data-component="winning-numbers-form"></div>
                </div>
            </div>
            <div data-component="lotto-result-modal"></div>
        `,
            childComponents: [
                {
                    selector: '[data-component="amount-form"]',
                    props: {purchaseTickets},
                    renderComponent: AmountForm,
                },
            ],
        });
    }

    render();
};
