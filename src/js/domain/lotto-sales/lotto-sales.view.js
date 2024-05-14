import prompt from "../../utils/prompt.js";

import { validateAmountPaid } from "./lotto-sales.contract.js";

class LottoSalesView {
  async inputPurchaseAmount() {
    const message = "> 구입금액을 입력해 주세요.\n";
    const format = (input) => parseInt(input, 10);
    const validate = validateAmountPaid;

    return await prompt({ message, format, validate });
  }

  printPurchaseResult(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      console.log(lotto.numbers);
    });
  }
}

export default LottoSalesView;
