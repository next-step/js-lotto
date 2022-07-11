class Lotto {
  constructor(lottoIcons) {
    this.lottoIcons = lottoIcons;
  }

  toggleLottoList = (lottoWrapper) => {
    this.lottoIcons.classList.toggle('flex-col');
    lottoWrapper.forEach((elem) => {
      elem.children[1].classList.toggle('is-active');
    });
  };

  showLottoList = (lottoWrapper) => {
    this.toggleLottoList(lottoWrapper);
  };

  hiddenLottoList = (lottoWrapper) => {
    this.toggleLottoList(lottoWrapper);
  };

  renderCreatedLottoList = (lottoNumberArrayList) => {
    const lottoList = this.lottoIcons;

    lottoNumberArrayList.forEach((lottoNumbers) => {
      const iconWrapper = document.createElement('li');
      iconWrapper.classList.add('lotto-wrapper', 'd-flex', 'items-center');

      const lottoIcon = document.createElement('span');
      lottoIcon.textContent = '🎟 ';
      lottoIcon.classList.add('lotto-icon', 'mx-1', 'text-4xl');

      const lottoDetail = document.createElement('span');
      lottoDetail.textContent = lottoNumbers.join(', ');
      lottoDetail.classList.add('lotto-detail', 'text-xl');

      iconWrapper.appendChild(lottoIcon);
      iconWrapper.appendChild(lottoDetail);
      lottoList.appendChild(iconWrapper);
    });
  };
}

export default Lotto;
