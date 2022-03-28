const RATING = [
    {
        index: 3,
        count: "3개",
        winnings: "5000",
    },
    {
        index: 4,
        count: "4개",
        winnings: "50000",
    },
    {
        index: 5,
        count: "5개",
        winnings: "1500000",
    },
    {
        index: "5+",
        count: "5개 + 보너스볼",
        winnings: "30000000",
    },
    {
        index: 6,
        count: "6개",
        winnings: "2000000000",
    },
];
export class LottoModal {
    tickets = null;
    rating = null;
    rate = null;
    props = null;
    $resultModal = null;
    $resultModalCloseButton = null;
    $resultModalArea = null;
    $resetButton = null;

    constructor(element, props) {
        this.$resultModalArea = element;
        this.props = props;
    }

    render() {
        this.$resultModalArea.innerHTML = this.getTemplate();
    }

    mounted() {
        this.$resultModal = document.querySelector("#result_modal");
        this.$resultModalCloseButton = document.querySelector("#result_modal_close");
        this.$resetButton = document.querySelector("#reset_button");
    }

    setEvent() {
        this.$resultModalCloseButton.addEventListener("click", () =>
            this.#onClickResultModalCloseButton()
        );
        this.$resetButton.addEventListener("click", () => this.#onClickResetButton());
    }

    onClickOpenResultModalButton() {
        this.$resultModal.classList.add("open");
    }

    #onClickResultModalCloseButton() {
        this.$resultModal.classList.remove("open");
    }

    #onClickResetButton() {
        this.props.onReset();
    }

    getTemplate() {
        return `
        <div id="result_modal" class="modal">
                <div class="modal-inner p-10">
                    <div id="result_modal_close" class="modal-close">
                        <svg viewbox="0 0 40 40">
                            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
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
                            ${this.getRatingTemplate()}
                            </tbody>
                        </table>
                    </div>
                    <p class="text-center font-bold">당신의 총 수익률은 ${this.#getRate().toLocaleString(
                        "ko-KR"
                    )}%입니다.</p>
                    <div class="d-flex justify-center mt-5">
                        <button id="reset_button" type="button" class="btn btn-cyan">다시 시작하기</button>
                    </div>
                </div>
            </div>
        `;
    }

    getRatingTemplate() {
        console.log(this.rating);
        return RATING.map(
            (r) =>
                `<tr class="text-center">
                <td class="p-3">${r.count}</td>
                <td class="p-3">${(+r.winnings).toLocaleString("ko-KR")}</td>
                <td class="p-3">${this.rating[r.index]}개</td>
            </tr>`
        ).join("");
    }

    #getTickets() {
        return this.tickets;
    }

    setTickets(tickets) {
        this.tickets = tickets;
    }

    #getRate() {
        return this.rate;
    }

    setRate(rate) {
        this.rate = rate;
    }

    #getRating() {
        return this.rating;
    }

    setRating(rating) {
        this.rating = rating;
    }
}
