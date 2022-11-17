import { LOTTO, PLACE, PRIZE, PLACE_LENGTH } from './constants/index.js';

const getLottoSize = (money) => {
  return money / LOTTO.PRICE;
};

const lottoNumbers = Array(LOTTO.MAX_NUM)
  .fill(1)
  .map((v, k) => v + k);
const generateLotto = () =>
  lottoNumbers
    .sort(() => 0.5 - Math.random())
    .slice(0, LOTTO.LENGTH)
    .sort((a, b) => a - b);

export const generateLottos = (money) => {
  const lottos = Array.from({ length: getLottoSize(money) }, () =>
    generateLotto()
  );
  return lottos;
};

const getInitialPlace = (matchNumber) => {
  switch (matchNumber) {
    case 3:
      return PLACE.FIFTH;
    case 4:
      return PLACE.FOURTH;
    case 5:
      return PLACE.THIRD;
    case 6:
      return PLACE.FIRST;
  }
};

const getMatchNumbers = (lotto, winningNumber) => {
  let matchNumbers = 0;
  lotto.forEach((v) => {
    if (winningNumber.indexOf(v) > -1) {
      matchNumbers++;
    }
  });
  return matchNumbers;
};

const getLottoPlace = (lotto, winningNumber, bonusNumber) => {
  const place = getInitialPlace(getMatchNumbers(lotto, winningNumber));
  if (place === PLACE.THIRD && lotto.indexOf(bonusNumber) > -1) {
    return PLACE.SECOND;
  }
  return place;
};

export const getLottoPlacesResult = (lottos, winningNumber, bonusNumber) => {
  const result = Array(PLACE_LENGTH).fill(0);
  lottos.forEach((lotto) => {
    result[getLottoPlace(lotto, winningNumber, bonusNumber)]++;
  });
  return result;
};

export const getLottoTotalPrize = (placeArray) => {
  const prizes = placeArray.map((place, i) => place * PRIZE[i]);
  return prizes.reduce((arr, cur) => arr + cur);
};
