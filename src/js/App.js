import Payment from "./Payment.js";
import Purchase from "./Purchase.js";
import ResultModal from "./ResultModal.js";
import WinningNumbers from "./WinningNumbers.js";

export default class App {
	constructor({ purchasedLottos, winningNumberArray }) {
		this.purchasedLottos = purchasedLottos;
		this.winningNumberArray = winningNumberArray;

		this.payment = new Payment({
			$payment: document.querySelector("#payment"),
			onSubmit: (count) => {
				this.purchase.setState(count);
				this.winningNumbers.render();
			},
		});

		this.purchase = new Purchase({
			count: 0,
			purchasedLottos,
			$purchaseInfo: document.querySelector(".purchase-info"),
			$purchaseCount: document.querySelector(".purchase-count"),
			$purchaseToggle: document.querySelector(".purchase-toggle"),
			$lottoInfo: document.querySelector(".lotto-info"),
		});

		this.winningNumbers = new WinningNumbers({
			$WinningNumbers: document.querySelector("#winning-numbers"),
		});

		this.resultModal = new ResultModal({
			$showResultButton: document.querySelector(".open-result-modal-button"),
			$modal: document.querySelector(".modal"),
			$modalClose: document.querySelector(".modal-close"),
		});
	}
}
