export default class ResultModal {
	constructor({ $showResultButton, $modal, $modalClose }) {
		this.$showResultButton = $showResultButton;
		this.$modal = $modal;
		this.$modalClose = $modalClose;

		const onModalShow = () => {
			this.$modal.classList.add("open");
		};

		const onModalClose = () => {
			this.$modal.classList.remove("open");
		};

		// this.$showResultButton.addEventListener("click", onModalShow);
		this.$modalClose.addEventListener("click", onModalClose);
	}
}
