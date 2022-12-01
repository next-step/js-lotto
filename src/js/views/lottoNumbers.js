const showLottoNums = (element) => {
  element.classList.remove('d-none');
};

const hideLottoNums = (element) => {
  element.classList.add('d-none');
};

export default (targetElement, { toggleOn }) => {
  const newLottoImages = targetElement.cloneNode(true);
  if (toggleOn) {
    showLottoNums(newLottoImages);
  } else {
    hideLottoNums(newLottoImages);
  }
  return newLottoImages;
};
