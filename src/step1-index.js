import AmountPaidInput from '../src/views/AmountPaidInput.js';
import PurchasedNumbers from '../src/views/PurchasedNumbers.js';
import LottoNumbersInput from '../src/views/LottoNumbersInput.js';

const LottoGame = async () => {
  const amountPaid = await AmountPaidInput();

  const purchasedNumbers = PurchasedNumbers(amountPaid);

  const lottoNumbers = await LottoNumbersInput();
};

LottoGame();
