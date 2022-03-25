import { LOTTO_NUMBER, LOTTO_NUMBER_ALL_LENGTH } from '../constants/constant.js';

export const createLotto = (count) => {
  let n = 0;
  let LottoContainer = [];
  const lottoCreateCount = Array(count)
    .fill()
    .map((context, index) => {
      return index + 1;
    });

  lottoCreateCount.forEach(() => {
    const lottoArray = Array(LOTTO_NUMBER_ALL_LENGTH)
      .fill()
      .map((context, index) => {
        return index + 1;
      });
    let shuffleLotto = [];

    lottoArray.reverse().forEach((number) => {
      let lottoRandomNumber = Math.floor(Math.random() * number);
      let lottoNumber = lottoArray.splice(lottoRandomNumber, 1)[0];
      shuffleLotto.push(lottoNumber);
    });

    let lottoTicket = shuffleLotto.slice(0, LOTTO_NUMBER).sort((p, c) => {
      return p - c;
    });
    LottoContainer.push(lottoTicket);
    n++;
  });

  return LottoContainer;
};
