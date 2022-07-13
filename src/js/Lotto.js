class Lotto {
  constructor(lottoIcons) {
    this.lottoIcons = lottoIcons;
  }

  toggleLottoList = () => {
    this.lottoIcons.classList.toggle('flex-col');
  };

  showLottoList = () => {
    this.toggleLottoList();
  };

  hiddenLottoList = () => {
    this.toggleLottoList();
  };

  renderCreatedLottoList = (lottoNumberArrayList) => {
    const lottoList = this.lottoIcons;
    const fragment = document.createDocumentFragment();

    lottoNumberArrayList.forEach((lottoNumbers) => {
      const iconWrapper = document.createElement('li');
      const lottoIcon = document.createElement('span');
      const lottoDetail = document.createElement('span');

      iconWrapper.classList.add('lotto-wrapper', 'd-flex', 'items-center');
      lottoIcon.textContent = '🎟 ';
      lottoIcon.classList.add('lotto-icon', 'mx-1', 'text-4xl');
      lottoDetail.textContent = lottoNumbers.join(', ');
      lottoDetail.classList.add('lotto-detail', 'text-xl');

      iconWrapper.appendChild(lottoIcon);
      iconWrapper.appendChild(lottoDetail);
      fragment.appendChild(iconWrapper);
    });
    lottoList.appendChild(fragment);
  };
}

export default Lotto;
