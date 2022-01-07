import { CONSTANT } from "./utils/constants.js";
import { validationNumbers } from "./utils/service.js";

export default class WinningNumbers {
	constructor({
		$showResultButton,
		$winningNumberInputs,
		$bonusNumberInput,
		$winningNumbers,
		setWinningNumbers,
	}) {
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
			if (
				validationNumbers(
					winningNumbers,
					CONSTANT.WINNING_NUMBERS_WITH_BONUS_LENGTH
				)
			) {
				setWinningNumbers(winningNumbers);
			}
		};

		this.$winningNumbers.addEventListener("submit", onClickResultButton);
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}
}
