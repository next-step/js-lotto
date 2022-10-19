function createLottoListTitle(count) {
  const purchaseLottoTitle = document.querySelector('.lotto-title');
  const newLabel = `총 ${count}개를 구매하였습니다.`;

  purchaseLottoTitle.innerText = newLabel;
}

export default createLottoListTitle;
