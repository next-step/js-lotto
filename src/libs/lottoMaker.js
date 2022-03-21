import CONSTANTS from '../common/constants.js';

export default function LottoMaker() {
  this.initLottoMaker = () => {
    this.lottos = [];
  };

  this.getLottoNumbers = () => {
    const lotto = [];

    while (lotto.length < CONSTANTS.COMMON.LOTTO_MAX_SIZE) {
      const randomNumber = Math.floor(Math.random() * CONSTANTS.COMMON.LOTTO_MAX_NUMBER) + 1;
      if (lotto.indexOf(randomNumber) === -1) lotto.push(randomNumber);
    }

    const sortedLotto = [...lotto].sort((a, b) => (a - b < 0 ? -1 : 1));
    return sortedLotto;
  };

  this.run = (coin) => {
    this.initLottoMaker();

    for (let i = 0; i < coin; i++) {
      this.lottos.push(this.getLottoNumbers());
    }

    return this.lottos;
  };
}

// function getLottoNumbers() {
//   const lotto = [];

//   while (lotto.length < CONSTANTS.COMMON.LOTTO_MAX_SIZE) {
//     const randomNumber = Math.floor(Math.random() * CONSTANTS.COMMON.LOTTO_MAX_NUMBER) + 1;
//     if (lotto.indexOf(randomNumber) === -1) lotto.push(randomNumber);
//   }

//   const sortedLotto = [...lotto].sort((a, b) => (a - b < 0 ? -1 : 1));
//   return sortedLotto;
// }

// export function lottoMaker(coin) {
//   const lottos = [];

//   for (let i = 0; i < coin; i++) {
//     this.lottos.push(this.getLottoNumbers());
//   }

//   return lottos;
// }
