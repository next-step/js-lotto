function PriceInput({ inputTarget, buttonTarget, onChange, onClick }) {
	inputTarget.addEventListener("keydown", onChange);
	buttonTarget.addEventListener("click", onClick);
}

export default PriceInput;
