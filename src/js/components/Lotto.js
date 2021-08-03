import Component from '../core/Component.js'
import { CLASS, SELECTOR } from '../utils/constants.js'
import { $get } from '../utils/dom.js'

export class Lotto extends Component {
	constructor(props) {
		super(props)
	}

	mapState() {
		this.stateList = ['isShowNumber']
	}

	setElements() {
		this.$lottoNumbers = $get(SELECTOR.LOTTO_NUMBERS, this.$target)
	}

	render() {
		if (this.isShowNumber) {
			this.$lottoNumbers.classList.remove(CLASS.DP_NONE)
		} else {
			this.$lottoNumbers.classList.add(CLASS.DP_NONE)
		}
	}

	template() {
		return /*html*/ `
      <li class="lotto mx-1 text-4xl">
        <span class="icon">🎟️ </span>
        <span class="${CLASS.DP_NONE} ${CLASS.LOTTO_NUMBERS}">
          ${this.props.lotto.join(', ')}
        </span>
      </li>
		`
	}
}
