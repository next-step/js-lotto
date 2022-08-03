import { LOTTO, PLACE, PRIZE } from './constants/index.js';

const getLottoNumbers = (money) => {
  return money / LOTTO.PRICE;
};

const lottoNumbers = Array(LOTTO.MAX_NUM)
  .fill(1)
  .map((v, k) => v + k);
const generateLotto = () =>
  lottoNumbers.sort(() => 0.5 - Math.random()).slice(0, LOTTO.LENGTH);

export const generateLottos = (money) => {
  const lottos = Array.from({ length: getLottoNumbers(money) }, () =>
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
      return PLACE.SECOND;
  }
};

const getMatchNumbers = (lotto, winningNumber) => {
  let matchNumbers = 0;
  lotto.forEach((v) => {
    if (winningNumber.contain(v)) {
      matchNumbers++;
    }
  });
  return matchNumbers;
};

const getLottoPlace = (lotto, winningNumber, bonusNumber) => {
  const place = getInitialPlace(getMatchNumbers(lotto, winningNumber));
  if (place === PLACE.THIRD && lotto.contain(bonusNumber)) {
    return PLACE.SECOND;
  }
  return place;
};

const getLottoPlacesResult = (lottos, winningNumber, bonusNumber) => {
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
