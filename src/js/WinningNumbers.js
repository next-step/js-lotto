import { CONSTANT, MESSAGE } from "./utils/constants.js";

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
				winningNumbers.filter((val) => !Number.isNaN(val)).length !==
				CONSTANT.WINNING_NUMBERS_WITH_BONUS_LENGTH
			)
				return alert(MESSAGE.BLANK_INPUT);
			if (Math.min(...winningNumbers) < CONSTANT.MIN_NUMBER || Math.max(...winningNumbers) > CONSTANT.MAX_NUMBER)
				return alert(MESSAGE.RANGE_ERROR);
			if (
				new Set(winningNumbers).size <
				CONSTANT.WINNING_NUMBERS_WITH_BONUS_LENGTH
			)
				return alert(MESSAGE.DUPLICATE_NUMBER);
			setWinningNumbers(winningNumbers);
		};

		this.$winningNumbers.addEventListener("submit", onClickResultButton);
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}
}
