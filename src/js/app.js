import Component from "./core/Component.js";
import InputValue from "./components/InputValue.js";
import ItemToggle from "./components/ItemToggle.js";
import {validation} from "./utils/validation.js"
import {generateRandom} from "./utils/generateRandom.js"
import {PRICE_FOR_ONE} from './const/const.js'
import {displayLottoLabel, displayToggleBtn, lottoHidden} from './view/view.js'

export default class App extends Component{

	setup() {
		this.$state = {
			inputValue : 0,
			lottoCnt : 0,
			lottoToggle : false,
			lottoList : [
				{
					numbers : [],
					showNum : false
				}
			]
		}
	}
	tempate() {
		return ``;
	}

	mounted() {
		const { setItemToggle } = this
		const $inputMoneyForm = this.$target.querySelector('#input-money-form')
		const $lottoToggleBtn = document.querySelector('.lotto-numbers-toggle-button')

		$inputMoneyForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const $inputValue = event.target['inputMoney'].value
			const check = validation(Number($inputValue))
			if(!check) {
				this.setState({inputValue: 0})
				return;
			}

			this.setLottoCnt(Number($inputValue))
		})

		new ItemToggle($lottoToggleBtn, {
			setItemToggle : setItemToggle.bind(this)
		})
	}

	setEvent() {}

	setLottoCnt (inputValue) {
		const lottoCnt = inputValue / PRICE_FOR_ONE
		this.setState({ lottoCnt : lottoCnt }) 
		this.setState({ inputValue: inputValue }) 
		displayLottoLabel(this.$state.lottoCnt)
		lottoHidden(false)
	}

	setItemToggle (target) {
		const setToggle = !target.checked
		this.setState({lottoToggle: setToggle})
		displayToggleBtn(this.$state)
		if( this.$state.inputValue > 0 ) generateRandom(this.$state.inputValue)
		
	}
}
