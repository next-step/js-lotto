import Component from "./core/Component.js";
import InputValue from "./components/InputValue.js";
export default class App extends Component{

	setup() {
		this.$state = {
			inputValue : 0,
			lottoList : [
				{
					numbers : [],
					showNum : false
				}
			]
		}
	}
	mounted() {
		const {lottoItems, inputValue, lottoToggle } = this
		
		// new InputValue($inputMoneyForm, {
			// inputValue: inputValue.bind(this)
		// })
	}

	setEvent() {
		const $inputMoneyForm = this.$target.querySelector('#input-money-form')
		$inputMoneyForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const $inputValue = event.target['inputMoney'].value
			this.inputValue(Number($inputValue))
			alert('입금 금액은 ' + this.$state.inputValue)
		})
	}

	inputValue (inputValue) {
		this.setState({inputValue: inputValue})
	}
	
}
