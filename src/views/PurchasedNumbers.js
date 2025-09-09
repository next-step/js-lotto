import { buyNumbers } from '../domain/amountPaid.js';
import { generatePurchasedNumbers } from '../domain/purchasedNumbers.js';

const PurchasedNumbers = (amountPaid) => {
  const purchasedLineCount = buyNumbers(amountPaid);

  const purchasedNumbers = generatePurchasedNumbers(purchasedLineCount);

  purchasedNumbers.forEach((lottoLine) => {
    console.log(lottoLine);
  });

  return purchasedNumbers;
};

export default PurchasedNumbers;
