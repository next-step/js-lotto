import Component from '../core/Component.js'
import { SELECTOR, CLASS } from '../utils/constants.js'
import { $get } from '../utils/dom.js'
import { Lotto } from './Lotto.js'

export class LottoSection extends Component {
	constructor() {
		super()
		this.lottoComponents = []
	}

	mapState() {
		this.stateList = ['lottos']
	}

	mapActions() {
		this.actionList = ['toggleIsShowNumber']
	}

	setElements() {
		this.$lottoContainer = $get(SELECTOR.LOTTO_CONTAINER, this.$target)
		this.$lottoCount = $get(SELECTOR.LOTTO_COUNT, this.$target)
		this.$lottoToggleBtn = $get(SELECTOR.LOTTO_TOGGLE_BTN, this.$target)
	}

	setEvents() {
		this.$lottoToggleBtn.addEventListener('click', () => {
			this.onToggleIsShowNumber()
		})
	}

	render() {
		if (this.lottos.length <= 0) {
			this.toggleTarget(false)
			return
		}

		this.setLottoCount()
		this.setLottoContainer()
		this.toggleTarget(true)
	}

	setLottoCount() {
		this.$lottoCount.innerText = this.lottos.length
	}

	setLottoContainer() {
		this.lottoComponents = []
		this.$lottoContainer.innerHTML = ''

		this.lottos.forEach((lotto) => {
			const lottoComponent = new Lotto({ lotto })
			this.lottoComponents.push(lottoComponent)
			this.$lottoContainer.appendChild(lottoComponent.$target)
		})
	}

	toggleTarget(isShow) {
		if (isShow) {
			this.$target.classList.remove(CLASS.DP_NONE)
		} else {
			this.$target.classList.add(CLASS.DP_NONE)
		}
	}

	onToggleIsShowNumber() {
		this.toggleIsShowNumber()
	}

	template() {
		return /*html*/ `
      <section class="mt-9 ${CLASS.DP_NONE}">
        <div class="d-flex">
          <label class="flex-auto my-0">총 <span class="${CLASS.LOTTO_COUNT}"></span>개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="lotto-numbers-toggle-button" />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <ul class="${CLASS.LOTTO_CONTAINER} d-flex flex-wrap"></ul>
      </section>
		`
	}
}
