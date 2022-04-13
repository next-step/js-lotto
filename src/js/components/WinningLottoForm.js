import LottoNumber from "../domain/LottoNumber.js";
import WinningNumbers from "../domain/WinningNumbers.js";

export default class WinningLottoForm {
    constructor(props) {
        this.$winngingArea = document.querySelector("#lotto-winning-area");
        this.props = props;
    }

    render() {
        this.$winngingArea.innerHTML = this.getWinningTemplate();
    }

    mounted() {
        document.querySelector("#open-result-modal-button").addEventListener("click", () => {
            this.onClickResultModalButton();
        });
        this.$winningNumbers = document.querySelectorAll(".winning-number");
        this.$bonusNumber = document.querySelector(".bonus-number");
    }

    onClickResultModalButton() {
        try {
            const winningNumbers = Array.from(this.$winningNumbers)
                .filter((data) => {
                    return data.value !== "";
                })
                .map((number) => Number(number.value));
            const bonusNumber = Number(this.$bonusNumber.value);

            WinningNumbers.validate(winningNumbers, bonusNumber);
            this.props.onReward(winningNumbers, bonusNumber);
        } catch (error) {
            alert(error.message);
        }
    }

    getWinningTemplate() {
        return `
        <form class="mt-9">
            <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
            <div class="d-flex">
                <div>
                    <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                    <div>
                        ${Array.from({ length: LottoNumber.LOTTO_LENGTH })
                            .map(
                                () =>
                                    `<input type="number" class="winning-number mx-1 text-center"/>`
                            )
                            .join("")}
                    </div>
                </div>
                <div class="bonus-number-container flex-grow">
                    <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                    <div class="d-flex justify-center">
                        <input type="number" class="bonus-number text-center" />
                    </div>
                </div>
            </div>
            <button type="button" id="open-result-modal-button" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>
        </form>`;
    }

    onReset() {
        this.$winngingArea.innerHTML = "";
    }
}
