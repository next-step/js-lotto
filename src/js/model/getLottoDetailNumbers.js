function getLottoDetailNumbers(){
  const lottoDetail = document.querySelectorAll('.lotto-detail');

  return Array.from(lottoDetail).map(it => it.innerText.split(','));
}

export default getLottoDetailNumbers;