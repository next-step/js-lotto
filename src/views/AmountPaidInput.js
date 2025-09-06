import readLineAsync from '../utils/readLineAsync.js';
import { buyNumbers } from '../domain/purchase.js';

const AmountPaidInput = async () => {
  const amountPaid = await readLineAsync('구입금액을 입력해 주세요');

  const purchasedLottoCount = buyNumbers(amountPaid);

  console.log(`${purchasedLottoCount}개를 구매했습니다.`);

  return amountPaid;
};

export default AmountPaidInput;
