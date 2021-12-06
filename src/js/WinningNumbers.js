export default class WinningNumbers {
	constructor({ $winningNumbers }) {
		this.$winningNumbers = $winningNumbers;
	}

	render() {
		this.$winningNumbers.classList.remove("hidden");
	}

	setState() {
		this.render();
	}
}
