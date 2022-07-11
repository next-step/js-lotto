const showAndHideList = (e, lotto) => {
  const { checked } = e.target;
  const lottoWrapper = document.querySelectorAll('.lotto-wrapper');
  if (checked) {
    lotto.showLottoList(lottoWrapper);
  } else {
    lotto.hiddenLottoList(lottoWrapper);
  }
};

export default showAndHideList;
