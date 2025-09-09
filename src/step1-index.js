import AmountPaidInput from '../src/views/AmountPaidInput.js';
import PurchasedNumbers from '../src/views/PurchasedNumbers.js';
import LottoNumbersInput from '../src/views/LottoNumbersInput.js';
import WinningsStatistics from '../src/views/WinningsStatistics.js';
import WinningsRate from '../src/views/WinningsRate.js';

const LottoGame = async () => {
  const amountPaid = await AmountPaidInput();

  const purchasedNumbers = PurchasedNumbers(amountPaid);

  const lottoNumbers = await LottoNumbersInput();

  const rankCountsMap = WinningsStatistics(purchasedNumbers, lottoNumbers);

  WinningsRate(amountPaid, rankCountsMap);
};

LottoGame();
