import PriceInput from "./PriceInput.js";
import LottoBoard from "./LottoBoard.js";
import UserLottoInput from "./UserLottoInput.js";
import Modal from "./Modal.js";

import getLotto from "../util/getLotto.js";

function Lotto() {
	this.price = 0;
	this.ticketNumber = 0;
	this.showLotto = false;
	this.lottos = [];
	this.userLotto;
	this.modalOpen = false;
	this.bonusNumber;
	this.result;

	const $priceInput = document.querySelector(".seed-money-input");
	const $priceButton = document.querySelector(".seed-money-button");
	new PriceInput({
		inputTarget: $priceInput,
		buttonTarget: $priceButton,
		onChange: (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				this.price = parseInt(e.target.value);
				this.lottos = getLotto(this.price / 1000);
				this.lottoBoard.setLottos(this.lottos);
				this.lottoBoard.render();
				this.userLottoInput.render();
				return;
			}
		},
		onClick: () => {
			this.price = parseInt($priceInput.value);
			this.lottos = getLotto(this.price / 1000);
			this.lottoBoard.setLottos(this.lottos);
			this.lottoBoard.render();
			this.userLottoInput.render();
		}
	});

	const toggleShowLotto = () => {
		this.showLotto = !this.showLotto;
		this.lottoBoard.setState(this.showLotto);
	};

	const $LottoBoard = document.querySelector(".lotto-board");
	this.lottoBoard = new LottoBoard({
		target: $LottoBoard,
		onChange: () => {
			toggleShowLotto();
		}
	});

	this.setUserLotto = (userLotto) => {
		this.userLotto = userLotto;
	};

	this.calculateProfitRatio = () => {
		let profit = 0;
		for (const key of this.result.keys()) {
			switch (key) {
				case 3:
					profit += 5000 * this.result[key];
					break;
				case 4:
					profit += 50000 * this.result[key];
					break;
				case 5:
					profit += 150000 * this.result[key];
					break;
				case "5b":
					profit += 30000000 * this.result[key];
					break;
				case 6:
					profit += 2000000000 * this.result[key];
					break;
			}
		}
		console.log("calculateProfit", profit);
		return ((profit - this.price) / this.price) * 100;
	};

	this.toggleModal = () => {
		this.modalOpen = !this.modalOpen;
		this.modal.setState(this.modalOpen, this.result, this.calculateProfitRatio());
	};

	this.calculateResult = () => {
		const board = new Array(46).fill(false);
		const result = [];
		console.log("bonusNumber", this.bonusNumber);
		for (const num of this.userLotto) {
			board[num] = true;
		}
		for (const lotto of this.lottos) {
			let hit = 0;
			let bonusIncluded = false;
			for (const num of lotto) {
				if (board[num]) {
					hit++;
				}
				if (num === this.bonusNumber) {
					bonusIncluded = true;
				}
			}

			if (bonusIncluded && hit === 5) {
				result.push("5b");
			} else {
				result.push(hit);
			}
		}

		const map = new Map();
		result.forEach((element) => {
			if (map.has(element)) {
				map.set(element, map.get(element) + 1);
			} else {
				map.set(element, 1);
			}
		});

		this.result = map;
	};

	this.setBonusNumber = (bonusNumber) => {
		this.bonusNumber = bonusNumber;
	};

	this.restart = () => {
		this.toggleModal();
		this.price = 0;
		this.ticketNumber = 0;
		this.showLotto = false;
		this.lottos = [];
		this.userLotto;
		this.modalOpen = false;
		this.bonusNumber;
		this.result;
		$LottoBoard.innerHTML = "";
		$UserLottoInput.innerHTML = "";
	};

	const $UserLottoInput = document.querySelector(".user-lotto-input");
	this.userLottoInput = new UserLottoInput({
		target: $UserLottoInput,
		setUserLotto: this.setUserLotto,
		toggleModal: this.toggleModal,
		calculateResult: this.calculateResult,
		setBonusNumber: this.setBonusNumber
	});

	const $modal = document.querySelector(".modal");
	this.modal = new Modal({
		target: $modal,
		toggleModal: this.toggleModal,
		onRestart: this.restart
	});
}

export default Lotto;
