import { buyLotto, generateLottoBundle } from "../src/domain/purchase.js";
import readLineAsync from "../src/utils/readLineAsync.js";

const LottoGame = async () => {
  // 로또 구매
  const amountPaid = await readLineAsync("구입금액을 입력해 주세요");
  const purchasedLottoCount = buyLotto(amountPaid);

  generateLottoBundle(purchasedLottoCount);

  // 수익률 계산
};

LottoGame();
