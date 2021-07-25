import Component from "../components/Component.js";
import { STEP_NUMBER } from "../utils/constants.js";

export default class Result extends Component{
    constructor({component, store}) {
        super({
            component,
            store
        });
    }
    handleSubmit(lastWinningLottoNum) {
        if(new Set(lastWinningLottoNum).size !== lastWinningLottoNum.length) {
            alert('중복된 숫자는 넣을 수 없습니다.')
            return
        }
        this.store.lastWinningLottoNum = lastWinningLottoNum
        this.store.step = STEP_NUMBER.THIRD
    }

    eventHandler() {
        const $inputs = this.$component.querySelectorAll('input')
        const $button = this.$component.querySelector('button')

        $inputs.forEach(($input, idx) => {
            $input.addEventListener('valid', () => {
                if($input.validity.rangeOverflow) {
                    $input.setCustomValidity('45이하로 입력하세요.')
                } else if($input.validity.rangeUnderflow) {
                    $input.setCustomValidity('1이상으로 입력하세요.')
                }  
            })
            $input.addEventListener('focus', () => {
                $input.value = ""
            })
            $input.addEventListener('keyup', () => {
                if($input.value.length == 2) {
                    const next = idx < 5 ? $input.nextElementSibling : $inputs[6]
                    next.value == "" && next.focus()
                }
            })
        })

        this.$component.onsubmit = (e) => {
            e.preventDefault()
            $button.focus()
            const lastWinningLottoNum = []
            $inputs.forEach(input => lastWinningLottoNum.push(input.value))
            this.handleSubmit(lastWinningLottoNum)
        }


    }

    template() {
        return `
        <label class="flex-auto d-inline-block mb-3"
            >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
        >
        <div class="d-flex">
            <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>
                <input
                    autofocus
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[0] || "''"}
                    class="winning-number mx-1 text-center"
                />
                <input
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[1] || "''"}
                    class="winning-number mx-1 text-center"
                />
                <input
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[2] || "''"}
                    class="winning-number mx-1 text-center"
                />
                <input
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[3] || "''"}
                    class="winning-number mx-1 text-center"
                />
                <input
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[4] || "''"}
                    class="winning-number mx-1 text-center"
                />
                <input
                    required
                    min=1
                    max=45
                    maxlength=2
                    type="number"
                    value=${this.store.lastWinningLottoNum[5] || "''"}
                    class="winning-number mx-1 text-center"
                />
                </div>
                </div>
                <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                <input
                    required                
                    min=1
                    max=45
                    maxlength=2 
                    type="number" 
                    value=${this.store.lastWinningLottoNum[6] || "''"}
                    class="bonus-number text-center" />
                </div>
                </div>
        </div>
        <button
            type="submit"
            class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
            결과 확인하기
        </button>
        `
    }
    
    render() {
        super.render()
        this.eventHandler()
        this.$component.style.display = this.store.step === STEP_NUMBER.FIRST ? "none" : ""
    }
}