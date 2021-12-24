import { CONSTANT } from './utils/constants.js';

export default class WinningNumbers {
	constructor({ $showResultButton, $winningNumberInputs, $bonusNumberInput, $winningNumbers, setWinningNumbers }) {
		this.$showResultButton = $showResultButton;
		this.$winningNumberInputs = $winningNumberInputs;
		this.$bonusNumberInput = $bonusNumberInput;
		this.$winningNumbers = $winningNumbers;

		const onClickResultButton = (e) => {
			e.preventDefault();
			const winningNumbers = [...this.$winningNumberInputs].map(
				(node) => node.valueAsNumber
			);
			winningNumbers.push(this.$bonusNumberInput.valueAsNumber);
			if(winningNumbers.filter(val => !Number.isNaN(val)).length !== CONSTANT.WINNING_NUMBERS_WITH_BONUS_LENGTH) return
			setWinningNumbers(winningNumbers);
		}

		this.$showResultButton.addEventListener('click' , onClickResultButton) 
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}
}
