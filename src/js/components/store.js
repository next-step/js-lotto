'use strict';

class LottoStore {
  constructor() {
    this.lottoList = [];
  }

  addLotto(lottoNumber) {
    this.lottoList.push(lottoNumber);
  }

  getLottoList() {
    return this.lottoList;
  }
}

export const lottoStore = new LottoStore();
