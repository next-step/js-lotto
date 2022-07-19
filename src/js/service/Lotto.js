import { LOTTO, LOTTO_NUMBER_UNIT } from '../constants.js';

class Lotto {
  constructor(lottoWrapperList) {
    this.lottoWrapperList = lottoWrapperList;
    this.lottoNumbers = [];
    this.score = {};
  }

  toggleLottoList = () => {
    this.lottoWrapperList.classList.toggle('flex-col');
  };

  createRandomNumber = () => {
    const { min, max } = LOTTO_NUMBER_UNIT;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  createLotto = () => {
    const lottoSet = new Set();

    while (lottoSet.size < LOTTO.SIZE) {
      lottoSet.add(this.createRandomNumber());
    }

    return [...lottoSet].sort((a, b) => a - b);
  };

  createLottoList = (dividedLottoCount) => {
    for (let i = 0; i < dividedLottoCount; i++) {
      this.lottoNumbers.push(this.createLotto());
    }
    return this.lottoNumbers;
  };

  renderCreatedLottoList = () => {
    const fragment = document.createDocumentFragment();

    this.lottoNumbers.forEach((lottoNumbers) => {
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

    this.lottoWrapperList.appendChild(fragment);
  };
}

export default Lotto;
