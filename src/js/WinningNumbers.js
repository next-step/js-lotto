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
			if(winningNumbers.filter(val => typeof val === 'number').length !== 7) return
			setWinningNumbers(winningNumbers);
		}

		this.$showResultButton.addEventListener('click' , onClickResultButton) 
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}
}
