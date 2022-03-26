import { MESSAGE } from "../constant/index.js";

const LOTTO_MAX_NUMBER = 45;

export class LottoWinning {
    props = null;
    winningNumbers = null;
    bonusNumber = null;

    constructor($winngingArea, props) {
        this.$winngingArea = $winngingArea;
        this.props = props;
    }

    render() {
        this.$winngingArea.innerHTML = this.getWinningTemplate();
    }

    mounted() {
        this.$resultModalOpenButton = document.querySelector("#open-result-modal-button");
        this.$winningNumbers = document.querySelectorAll(".winning-number");
        this.$bonusNumber = document.querySelector(".bonus-number");
    }

    setEvent() {
        this.$resultModalOpenButton.addEventListener("click", (event) => {
            if(this.checkWinningNumber().isComplete) {
                this.props.onLottoModal();
                this.props.setLottoNumbers(this.#getWinningNumbers());
                this.props.setBonusNumber(this.#getBonusNumber());
            }            
        });
    }

    checkWinningNumber() {
        let winningNumber = {};
        let resultValue = {isComplete: true, message: ""};

        for(let i=0; i<this.$winningNumbers.length; i++) {
            if(!this.$winningNumbers[i].value) {
                resultValue = {
                    isComplete: false,
                    message: "입력하지 않은 당첨 번호가 있습니다."
                }

                return resultValue; 
            }

            if(this.$winningNumbers[i].value > LOTTO_MAX_NUMBER) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.MAX_PURCHASE
                }
                
                return resultValue;
            }

            if(winningNumber[this.$winningNumbers[i].value]) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.EXIST_WINNING_NUMBER
                }
                
                return resultValue;
            } else {
                winningNumber[this.$winningNumbers[i].value] = this.$winningNumbers[i].value;
            }
        }

        if(!this.$bonusNumber.value) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호를 입력하지 않았습니다."
            }
            
            return resultValue;
        }

        if(winningNumber[this.$bonusNumber.value]) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호가 당첨 번호와 중복되는 번호입니다."
            }
            
            return resultValue;
        }

        this.#setWinningNumbers(Object.values[winningNumber]);
        this.#setBonusNumber(this.$bonusNumber.value);
        return resultValue;
    }

    #getWinningNumbers() {
        return this.winningNumbers;
    }

    #setWinningNumbers(numbers) {
        this.winningNumbers = numbers;
    }

    #getBonusNumber() {
        return this.bonusNumber;
    }

    #setBonusNumber(number) {
        this.bonusNumber = number;
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
