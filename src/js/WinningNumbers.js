export default class WinningNumbers {
	constructor({ $showResultButton, $winningNumbersForm, $bonusNumberForm, $winningNumbers, setWinningNumbers }) {
		this.$showResultButton = $showResultButton;
		this.$winningNumbersForm = $winningNumbersForm;
		this.$bonusNumberForm = $bonusNumberForm;
		this.$winningNumbers = $winningNumbers;


		const onClickResultButton = (e) => {
			e.preventDefault();
			const winningNumbers = Array.prototype.slice.call(this.$winningNumbersForm).map(
				(node) => node.valueAsNumber
			);
			winningNumbers.push(this.$bonusNumberForm.valueAsNumber);
			if(winningNumbers.filter(val => typeof val === 'number').length !== 7) return
			setWinningNumbers(winningNumbers);
		}

		this.$showResultButton.addEventListener('click' , onClickResultButton) 
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}
}
