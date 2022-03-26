import { SELECTOR, MESSAGE, LOTTO_MAX_NUMBER } from "../constant/index.js";
import { $, $$ } from "../utils/selector.js";

export class LottoWinning {
    constructor($winngingArea) {
        this.$winngingArea = $winngingArea;
    }

    render() {
        this.$winngingArea.innerHTML = this.getWinningTemplate();
    }

    mounted() {
        this.$resultModalOpenButton = $(SELECTOR.ID.OPEN_RESULT_MODAL_BUTTON);
        this.$resultModal = $(SELECTOR.ID.RESULT_MODAL);
        this.$resultModelCloseButton = $(SELECTOR.ID.RESULT_MODAL_CLOSE);
        this.$winningNumbers = $$(SELECTOR.CLASS.WINNING_NUMBER);
        this.$bonusNumber = $(SELECTOR.CLASS.BONUS_NUMBER);
    }

    setEvent() {
        this.$resultModalOpenButton.addEventListener("click", (event) => this.onClickOpenResultModalButton())
        this.$resultModelCloseButton.addEventListener("click", (event) => this.onClickResultModalCloseButton());
    }

    onClickOpenResultModalButton() {
        if(this.checkWinningNumber()) {
            this.$resultModal.classList.add(SELECTOR.CLASS.OPEN.substring(1));
        }        
    }

    onClickResultModalCloseButton() {
        this.$resultModal.classList.remove(SELECTOR.CLASS.OPEN.substring(1));
    }

    checkWinningNumber() {
        let winningNumber = {};
        let number = "";

        this.$winningNumbers.forEach(number => {
            if(number.value > LOTTO_MAX_NUMBER) {
                alert(MESSAGE.ERROR.MAX_PURCHASE);
                return false;
            }

            if(!winningNumber[number.value]) {
                winningNumber[number.value] = number.value;
                alert(MESSAGE.ERROR.EXIST_WINNING_NUMBER);
                return false;
            }
        })

        console.log(winningNumber);
        return true;
    }

    getWinningTemplate() {
        return `
        <form class="mt-9">
            <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
            <div class="d-flex">
                <div>
                    <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                    <div>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
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
}
