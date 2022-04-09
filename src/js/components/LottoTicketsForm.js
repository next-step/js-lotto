export default class LottoTicketsForm {
    lottos;

    constructor() {
        this.$lottoAmountArea = document.querySelector("#lotto-amount-area");
        this.$lottoTicketArea = document.querySelector("#lotto-ticket-area");
        this.isChecked = false;
    }

    render() {
        this.$lottoAmountArea.innerHTML = this.#getLottoAmountTemplate();
        this.$lottoTicketArea.innerHTML = this.#getLottoTicketsTemplate();
    }

    mounted() {
        this.$switch = document.querySelector(".switch");
        this.$lottoTicket = document.querySelectorAll(".lotto-ticket");

        this.$switch.addEventListener("click", (event) => this.#onSwitchClick(event));
    }

    #onSwitchClick(event) {
        if (event.target.classList.contains("lotto-numbers-toggle-button")) {
            this.isChecked = !this.isChecked;
            this.$lottoTicketArea.classList.toggle("flex-col");
            this.$lottoTicketArea.classList.toggle("flex-row");

            Array.from(this.$lottoTicket).forEach((ticket) => {
                ticket.querySelector(".lotto-detail").classList.toggle("d-none");
            });
        }
    }

    #getLottoAmountTemplate() {
        return `
        <label class="flex-auto my-0">총 <span data-test="lotto-amount">${
            this.lottos.length
        }</span>개를 구매하였습니다.</label>
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

    #getLottoTicketsTemplate() {
        return this.lottos
            .map(
                (ticket) =>
                    `<li class="mx-1 text-4xl lotto-wrapper d-block p-0 lotto-ticket" data-test="lotto-ticket">
                        <span class="lotto-icon">🎟️ </span>
                        <span class="lotto-detail text-xl
                        ${this.isChecked ? "" : "d-none"}" data-test="lotto-detail">
                        ${ticket.join(", ")}
                        </span>
                    </li>`
            )
            .join("");
    }
}
