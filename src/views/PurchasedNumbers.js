import { buyNumbers, generateLottoLine } from '../domain/purchase.js';

const PurchasedNumbers = (amountPaid) => {
  let purchasedNumbers = [];

  const purchasedLottoCount = buyNumbers(amountPaid);

  for (let i = 0; i < purchasedLottoCount; i++) {
    const lottoLine = generateLottoLine();

    console.log(lottoLine);

    purchasedNumbers = [...purchasedNumbers, lottoLine];
  }

  return purchasedNumbers;
};

export default PurchasedNumbers;
