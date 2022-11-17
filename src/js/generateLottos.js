import { LOTTO_LENGTH, LOTTO_NUMBER_RANGE } from './constants.js';

const generateLottoNumbers = () => {
  const lottoNumbers = Array.from({ length: LOTTO_NUMBER_RANGE }).map((_, i) => i + 1);
  return lottoNumbers
    .sort(() => Math.random() - 0.5)
    .slice(0, LOTTO_LENGTH)
    .sort((a, b) => a - b);
};

// 리뷰 전 코드....
// const generateLottoNumbers = () => {
//   const numberSet = new Set();
//   while (numberSet.size < LOTTO_LENGTH) {
//     const generatedNumber = getRandomNumber(LOTTO_NUMBER_RANGE);
//     numberSet.add(generatedNumber);
//   }
//   return [...numberSet];
// };

// const getRandomNumber = (max) => {
//   return Math.floor(Math.random() * max) + 1;
// };

export { generateLottoNumbers };
