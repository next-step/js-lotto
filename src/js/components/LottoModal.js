export class LottoModal {
    tickets = null;
    winningNumbers = null;
    bonusNumber = null;
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
        this.$resultModalCloseButton.addEventListener("click", (event) => this.#onClickResultModalCloseButton());
        this.$resetButton.addEventListener("click", (event) => this.#onClickResetButton());
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
                                <tr class="text-center">
                                    <td class="p-3">3개</td>
                                    <td class="p-3">5,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">4개</td>
                                    <td class="p-3">50,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">5개</td>
                                    <td class="p-3">1,500,000</td>
                                    <td class="p-3"><span class="winnign-count"></span>개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">5개 + 보너스볼</td>
                                    <td class="p-3">30,000,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">6개</td>
                                    <td class="p-3">2,000,000,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
                    <div class="d-flex justify-center mt-5">
                        <button id="reset_button" type="button" class="btn btn-cyan">다시 시작하기</button>
                    </div>
                </div>
            </div>
        `;
    }

    getTicketNumbers() {
        return this.tickets;
    }

    setTicketNumbers(numbers) {
        this.tickets = numbers;
    }

    #getWinningNumber() {
        return this.winningNumbers;
    }

    setWinningNumber(numbers) {
        this.winningNumbers = numbers;
    }

    #getBonusNumber() {
        return this.bonusNumber;
    }

    setBonusNumber(number) {
        this.bonusNumber = number;
    }

    computeLottoResult() {

    }
}