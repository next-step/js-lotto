class Lotto {
  constructor(lottoIcons) {
    this.lottoIcons = lottoIcons;
  }

  renderCreatedLottoList = (lottoNumberList) => {
    const itemList = this.lottoIcons;

    lottoNumberList.forEach((item) => {
      const iconWrapper = document.createElement('li');
      iconWrapper.classList = 'lotto-wrapper d-flex items-center';
      const lottoIcon = document.createElement('span');
      lottoIcon.textContent = '🎟 ';
      lottoIcon.classList = 'lotto-icon mx-1 text-4xl';
      const lottoDetail = document.createElement('span');
      lottoDetail.textContent = item.join(', ');
      lottoDetail.classList = 'lotto-detail text-xl';
      iconWrapper.appendChild(lottoIcon);
      iconWrapper.appendChild(lottoDetail);
      itemList.appendChild(iconWrapper);
    });
  };
}

export default Lotto;
