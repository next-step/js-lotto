import Component from "../components/Component.js";
import { STEP_NUMBER } from "../utils/constants.js";

export default class PurchaseList extends Component {
    constructor({component, store}) {
        super({
          component,
          store
        })
    }

    eventHandler() {
      const $switch = this.$component.querySelector('input')

      $switch.addEventListener('click', (e) => {
        this.store.checked = e.target.checked
      })
    }


    template() {
        return`
        <div class="d-flex">
            <label class="flex-auto my-0">총 ${this.store.lottoArr.length}개를 구매하였습니다.</label>
            <div class="flex-auto d-flex justify-end pr-1">
              <label class="switch">
                <input ${this.store.checked ? "checked" : ""} type="checkbox" class="lotto-numbers-toggle-button" />
                <span class="text-base font-normal">번호보기</span>
              </label>
            </div>
          </div>
          <ul id="lotto-icons" class="d-flex flex-wrap ${this.store.checked ? "flex-col" : ""}">
            ${
              this.store.lottoArr
              .map(lotto => `<li class="d-flex flex-wrap"><span class="mx-1 text-4xl">🎟️ </span><span class="lotto-detail" style="display:${this.store.checked ? "inline": "none"};">${lotto.join(', ')}</span></li> `).join('')
            }
          </ul>
        `
    }
    render() {
      super.render()
      this.eventHandler()
      this.$component.style.display = this.store.step === STEP_NUMBER.FIRST ? "none" : ""
    }
    
}