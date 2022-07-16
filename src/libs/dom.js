const changeDisplayBlockToNone = (element) => {
	element.classList.remove('d-block');
	element.classList.add('d-none');
};

const changeDisplayNoneToBlock = (element) => {
	element.classList.remove('d-none');
	element.classList.add('d-block');
};

const resetInputValue = (...inputsArgs) => {
	inputsArgs.forEach((inputs) => {
		if (inputs.length > 0) {
			inputs.forEach((input) => (input.value = ''));
		} else {
			inputs.value = '';
		}
	});
};

export { changeDisplayBlockToNone, changeDisplayNoneToBlock, resetInputValue };
