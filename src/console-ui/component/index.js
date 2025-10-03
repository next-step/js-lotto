import {
  purchaseAmountValidator,
  lottoNumberValidator,
} from "../validator/index.js";
import { inputStringWithPlaceholder } from "../input/index.js";

const purchaseAmountComponent = async (store) => {
  const purchaseAmountString = await inputStringWithPlaceholder(
    "> 구입금액을 입력해 주세요. "
  );
  const purchaseAmount = purchaseAmountValidator(purchaseAmountString);

  store.set("purchaseAmount", purchaseAmount);
};

const winningLottoNumberComponent = async (store) => {
  const winningLottoNumberString = await inputStringWithPlaceholder(
    "> 당첨 번호를 입력해 주세요. "
  );
  const winningLottoNumber = lottoNumberValidator(winningLottoNumberString);
  store.set("winningLottoNumber", winningLottoNumber);
};

const bonusNumberComponent = async (store) => {
  const bonusNumberString = await inputStringWithPlaceholder(
    "> 보너스 번호를 입력해 주세요. "
  );
  const bonusNumber = lottoNumberValidator(bonusNumberString);
  store.set("bonusNumber", bonusNumber);
};

const winningReportComponent = async (store) => {
  //   {
  //     matched: Map(2) {
  //     { matchedNumberCount: 4, matchedBonusNumberCount: 0, prize: 50000 } => 1,
  //     { matchedNumberCount: 3, matchedBonusNumberCount: 0, prize: 5000 } => 2
  //   },
  //   winningRate: 60
  // }

  const reportInfo = store.get("winningReport");

  console.log("당첨 통계");
  console.log("--------------------");

  reportInfo.matched
    .entries()
    .forEach(
      ([{ matchedNumberCount, matchedBonusNumberCount, prize }, count]) => {
        console.log(
          `${matchedNumberCount}개 일치${
            matchedBonusNumberCount > 0 ? ", 보너스 볼 일치" : ""
          } (${prize}원) - ${count}개`
        );
      }
    );
  console.log(`총 수익률은 ${reportInfo.winningRate}%입니다.`);
};

export {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
};
