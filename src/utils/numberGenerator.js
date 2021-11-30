import { MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER } from "./constants.js";

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomNumbers = () => {
  const newLottoNumbers = Array.from({ length: 6 }, () => {
    return generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);
  });

  return newLottoNumbers;
};

export const generateLottoNumbers = (amounts) => {
  const lottoTicketsList = [...new Array(amounts)].map(() => {
    return generateRandomNumbers();
  });

  return lottoTicketsList;
};
