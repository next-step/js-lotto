import { SELECTOR } from "../constant/index.js";
import { $, $$ } from "../utils/selector.js";

export class LottoTickets {
    constructor($amountArea, $ticketArea) {
        this.$amountArea = $amountArea;
        this.$ticketArea = $ticketArea;
        this.amount = 0;
        this.isChecked = false;
    }

    render() {
        this.$amountArea.innerHTML = this.getLottoAmountTemplate();
        this.$ticketArea.innerHTML = this.getLottoTicketsTemplate();
    }

    mounted() {
        this.$switch = $(SELECTOR.CLASS.SWITCH);
        this.$lottoTickets = $$(SELECTOR.CLASS.LOTTO_TICKET);
    }

    setEvent() {
        this.$switch.addEventListener("click", (event) => this.onSwitchClick(event));
    }

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    setTickets(tickets) {
        this.tickets = tickets;
    }

    onSwitchClick(event) {
        if (
            event.target.classList.contains(SELECTOR.CLASS.LOTTO_NUMBER_TOGGLE_BUTTON.substring(1))
        ) {
            this.isChecked = !this.isChecked;
            this.$ticketArea.classList.toggle(SELECTOR.CLASS.FLEX_COL.substring(1));
            this.$ticketArea.classList.toggle("flex-row");
            Array.from(this.$lottoTickets).forEach((ticket) => {
                ticket
                    .querySelector(SELECTOR.CLASS.LOTTO_DETAIL)
                    .classList.toggle(SELECTOR.CLASS.DISPLAY_NONE.substring(1));
            });
        }
    }

    getLottoAmountTemplate() {
        return `    
        <label class="flex-auto my-0">총 <span data-test="lotto-amount">${this.getAmount()}</span>개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch" data-test="switch">
                <input type="checkbox" class="lotto-numbers-toggle-button" ${
                    this.isChecked ? "checked" : ""
                }/>
                <span class="text-base font-normal">번호보기</span>
            </label>
        </div>
        `;
    }

    getLottoTicketsTemplate() {
        let template = "";

        this.tickets.forEach((ticket) => {
            template += `
            <li class="mx-1 text-4xl lotto-wrapper d-block p-0 lotto-ticket" data-test="lotto-ticket">
                <span class="lotto-icon">🎟️ </span>
                <span class="lotto-detail text-xl ${this.isChecked ? "" : "d-none"}" data-test="lotto-detail">
                ${ticket.join(", ")}
                </span>
            </li>`;
        });

        return template;
    }
}
