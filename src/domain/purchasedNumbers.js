import { LINE_MAXIMUM_NUMBER, LINE_SIZE } from '../constants/purchase.js';

export const generateLottoLine = () => {
  const lottoLine = [];

  const numberRange = Array.from(
    { length: LINE_MAXIMUM_NUMBER },
    (v, i) => i + 1,
  );

  for (let i = 0; i < LINE_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * numberRange.length);

    lottoLine.push(...numberRange.splice(randomIndex, 1));
  }

  lottoLine.sort((a, b) => a - b);
  return lottoLine;
};

export const generatePurchasedNumbers = (lineCount) => {
  const purchasedNumbers = [];

  for (let i = 0; i < lineCount; i++) {
    const lottoLine = generateLottoLine();
    purchasedNumbers.push(lottoLine);
  }

  return purchasedNumbers;
};
