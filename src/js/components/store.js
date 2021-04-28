'use strict';

class LottoStore {
  constructor() {
    this.lottoList = [];
  }

  addLotto(lottoNumbers) {
    const lotto = {
      numbers: [],
      rank: 'noRank',
    };
    lotto.numbers = lottoNumbers;
    this.lottoList.push(lotto);
  }

  getLottoList() {
    return this.lottoList;
  }
}

export const lottoStore = new LottoStore();
