import Component from "./core/Component.js";
import InputValue from "./components/InputValue.js";
import ItemToggle from "./components/ItemToggle.js";
import {validation} from "./utils/validation.js"
import {generateRandom} from "./utils/generateRandom.js"
import {PRICE_FOR_ONE} from './const/const.js'
import {resetToggleBtn, displayLottoLabel, displayToggleBtn, lottoHidden, generateLottoTicket, removeAllLottoTickets} from './view/view.js'

export default class App extends Component{

	setup() {
		this.$state = {
			inputValue : 0,
			lottoCnt : 0,
			lottoToggle : false,
			lottoList : []
		}
	}

	setEvent() {
		const { setItemToggle } = this
		const $inputMoneyForm = this.$target.querySelector('#input-money-form')
		const $lottoToggleBtn = document.querySelector('.lotto-numbers-toggle-button')

		$inputMoneyForm.addEventListener('submit', event => {
			event.preventDefault();
			const $inputValue = event.target['inputMoney'].value
			const isUnit1000 = validation(Number($inputValue))
			if(!isUnit1000) {
				alert('1000원 단위로 입력해주세요.')
				return;
			}
			if(this.$state.lottoList.length > 0 ) {
				this.initLottoTickets()
			}
			
			this.setLottoCntInputValue(Number($inputValue))
			displayLottoLabel(this.$state.lottoCnt)
			lottoHidden(false)
			for(let i = 0; i < this.$state.lottoCnt; i++) {
				const lottoNums = generateRandom()
				generateLottoTicket(lottoNums)
				this.$state.lottoList.push(lottoNums)
			}
			
		})

		new ItemToggle($lottoToggleBtn, {
			setItemToggle : setItemToggle.bind(this)
		})
	}

	setLottoCntInputValue (inputValue) {
		const lottoCnt = inputValue / PRICE_FOR_ONE
		this.setState({ lottoCnt : lottoCnt }) 
		this.setState({ inputValue: inputValue }) 
	}

	setItemToggle (target) {
		const setToggle = !target.checked
		this.setState({lottoToggle: setToggle})
		displayToggleBtn(this.$state)
	}
	
	initLottoTickets () {
		removeAllLottoTickets()
		resetToggleBtn()
	}
} 
