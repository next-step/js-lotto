const changeDisplayBlockToNone = (element) => {
	element.classList.remove('d-block');
	element.classList.add('d-none');
};

const changeDisplayNoneToBlock = (element) => {
	element.classList.remove('d-none');
	element.classList.add('d-block');
};

export { changeDisplayBlockToNone, changeDisplayNoneToBlock };
