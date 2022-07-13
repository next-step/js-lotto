const toggleLottoNumbers = (e, lotto) => {
  const { checked } = e.target;
  if (checked) {
    lotto.showLottoList();
  } else {
    lotto.hiddenLottoList();
  }
};

export default toggleLottoNumbers;
