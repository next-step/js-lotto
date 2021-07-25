import Component from "../components/Component.js"
import { STEP_NUMBER } from "../utils/constants.js"
import { createLottoNumber } from "../utils/util.js"

export default class Input extends Component{
    constructor({component, store}) {
        super({
            component, 
            state : {
                purchaseAmount : ""
            },
            store
        })
    }

    

    handleInputChange(e) {
        this.state = {
            purchaseAmount : e.target.value
        }
    }

    handleBtnClick(e) {
        // e.preventDefault()
        // e.stopPropagation()
        const amount = +this.state.purchaseAmount
        
        if(amount < 1000) {
            // alert('')
            return
        } else if(amount % 1000  !== 0) {
            alert('로또를 1000원 단위로만 구입할 수 있습니다.')
            return
        }
        this.store.lottoArr = createLottoNumber(Math.floor(amount/1000))
        this.store.purchaseAmount = amount
        this.store.step = STEP_NUMBER.SECOND

    }

    eventHandler() {
        const $input = this.$component.querySelector('.w-100')
        const $button = this.$component.querySelector('.btn')
        
        

        $input.addEventListener("valid", (e) => {
            if($input.validity.valueMissing) {
                $input.setCustomValidity('구입 금액은 필수 입력입니다.')
            } else if(+$input.value % 1000 !== 0) {
                $input.setCustomValidity('1000단위로만 입력 가능합니다.')
            }

        })

        $input.addEventListener('change', e => {
            this.handleInputChange(e)
        })
        
        $input.addEventListener('keypress', e => {
            if(e.key === 'Enter') {
                $button.focus()
                $button.click()
            } else if(e.key.length !== 1 || (48 > e.key.charCodeAt() || 57 < e.key.charCodeAt())) {
                return
            }
        })
        
        
        $button.addEventListener('click', e => {
            this.handleBtnClick(e)
        })

    }

    template() {
        return `
            <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
            <div class="d-flex">
                <input
                    value=${this.store.purchaseAmount || ""}
                    required
                    autofocus
                    type="number"
                    min=1000
                    class="w-100 mr-2 pl-2"
                    placeholder="구입 금액"
                    value=${this.state.purchaseAmount}
                />
                <button type="submit" class="btn btn-cyan">확인</button>
            </div>`
    }
    render() {
        super.render()
        this.eventHandler()
    }
}