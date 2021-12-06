import {AmountForm} from './AmountForm.js';
import {$} from '../utils/element.js';
import RenderService from '../services/RenderService.js';
import {LottoResultModal} from './LottoResultModal.js';
import {TicketsForm} from './TicketsForm.js';
import {Tickets} from './Tickets.js';
import {PRICE_PER_TICKET} from '../consts.js';
import {WinningNumbersForm} from './WinningNumbersForm.js';

export const LottoApp = ($el) => {

    /**
     * @type {{amount: number | null, tickets: Ticket[]}}
     */
    const state = {
        amount: 0,
        tickets: [],
    };

    function typeAmount(amount) {
        state.amount = amount;
        TicketsForm($('[data-component="tickets-form"]', $el), {amount: state.amount, purchaseTickets});
    }

    function purchaseTickets(tickets) {
        state.tickets = [...state.tickets, ...tickets];
        Tickets($('[data-component="tickets"]', $el), {tickets: state.tickets});

        const balance = state.amount - state.tickets.length * PRICE_PER_TICKET;
        if (!balance) {
            WinningNumbersForm($('[data-component="winning-numbers-form"]', $el), {pickWinningNumbers});
        }
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
                    <div data-component="tickets-form"></div>
                    <div data-component="tickets"></div>
                    <div data-component="winning-numbers-form"></div>
                </div>
            </div>
            <div data-component="lotto-result-modal"></div>
        `,
            childComponents: [
                {
                    selector: '[data-component="amount-form"]',
                    props: {typeAmount},
                    renderComponent: AmountForm,
                },
            ],
        });
    }

    render();
};
