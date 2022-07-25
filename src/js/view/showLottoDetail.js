function showLottoDetail(isChecked) {
  const lotto = document.querySelector('#lotto-list');
  const lottoDetail = document.querySelectorAll('.lotto-detail');

  if (isChecked) {
    lotto.classList.add('flex-col');
    lottoDetail.forEach((lotto) => (lotto.style.display = 'inline'));
  } else {
    lotto.classList.remove('flex-col');
    lottoDetail.forEach((lotto) => (lotto.style.display = 'none'));
  }
}

export default showLottoDetail;
