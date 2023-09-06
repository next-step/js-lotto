import { getStatistics } from "./js/domain/Lotto";
import { LottoRetailer } from "./js/domain/LottoRetailer";
import { LottoWinningNumber } from "./js/domain/LottoWinningNumber";
import { Console } from "./js/view/Console";

const play = async (view) => {
  const amount = await view.getUserInput("구입금액을 입력해 주세요: ", {
    parser: (inputStr) => {
      const amount = parseInt(inputStr, 10);
      if (isNaN(amount)) {
        throw Error("숫자가 아닙니다.");
      }
      if (amount < 0) {
        throw Error("양수가 아닙니다.");
      }
      return amount;
    },
  });

  const retailer = new LottoRetailer();
  const { lottoList, change } = retailer.issues(amount);
  view.print(`${lottoList.length}개를 구매하셨습니다. (거스름 돈: ${change})`);

  if (lottoList.length === 0) {
    return 0;
  }

  lottoList.forEach((lotto) => view.print(`[${lotto.numbers.join(", ")}]`));

  const winningNumbers = await view.getUserInput(
    "당첨 번호를 입력해 주세요: ",
    {
      parser: (inputStr) => {
        const winningNumbers = inputStr
          .split(",")
          .map((numStr) => parseInt(numStr.trim()), 10)
          .filter((num) => !isNaN(num));
        LottoWinningNumber.validateNumbers(winningNumbers);
        return winningNumbers;
      },
    }
  );

  const bonusNumber = await view.getUserInput("보너스 번호를 입력해 주세요: ", {
    parser: (inputStr) => {
      const bonusNumber = parseInt(inputStr, 10);
      if (isNaN(bonusNumber)) {
        throw Error("숫자가 아닙니다.");
      }
      LottoWinningNumber.validateNumbers(winningNumbers, bonusNumber);
      return bonusNumber;
    },
  });

  const winningNumber = new LottoWinningNumber(winningNumbers, bonusNumber);

  lottoList.forEach((lotto) => lotto.check(winningNumber));
  const statistics = getStatistics(lottoList);

  view.print("");
  view.print("당첨 통계");
  view.print("--------------------");
  view.print(`3개 일치 (5,000원) - ${statistics.placeMap[5] ?? 0}개`);
  view.print(`4개 일치 (50,000원) - ${statistics.placeMap[4] ?? 0}개`);
  view.print(`5개 일치 (1,500,000원) - ${statistics.placeMap[3] ?? 0}개`);
  view.print(
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics.placeMap[2] ?? 0}개`
  );
  view.print(`6개 일치 (2,000,000,000원) - ${statistics.placeMap[1] ?? 0}개`);
  view.print(`총 수익률은 ${statistics.rateOfReturn.toFixed(2)}%입니다.`);

  return 0;
};

(async function () {
  const view = new Console();
  let playAgain = false;
  do {
    if ((await play(view)) !== 0) {
      break;
    }

    playAgain = await view.getUserInput("재시작 하시겠습니까? [Y/n]", {
      parser: (inputStr) => {
        if (inputStr === "" || ["y", "yes"].includes(inputStr.toLowerCase())) {
          return true;
        }
        return false;
      },
    });
  } while (playAgain);
  view.close();
})();
