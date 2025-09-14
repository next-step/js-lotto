import { LottoMachine } from "./domains/LottoMachine/index.js";
import { LottoNumber } from "./domains/LottoNumber/index.js";
import { Lotto } from "./domains/Lotto/index.js";
import { WinningLotto } from "./domains/WinningLotto/index.js";
import { LottoShop } from "./domains/LottoShop/index.js";
import { RANKS, LottoChecker } from "./domains/LottoChecker/index.js";
import { ask } from "./ui/utils/ask.js";

const play = async () => {
  const lottoShop = new LottoShop({
    lottoMachine: new LottoMachine(),
    lottoPrice: LottoShop.BASE_LOTTO_PRICE,
  });

  const purchasePrice = await ask(
    "구입금액을 입력해 주세요. ",
    InputValidator.validatePurchasePrice
  );

  const lottos = lottoShop.buyLottos(purchasePrice);

  print(`${lottos.length}개를 구매했습니다.`);
  printLottos(lottos);
  console.log();

  const winningNumbers = await ask(
    "당첨 번호를 입력해 주세요. ",
    InputValidator.validateWinningNumbers
  );
  console.log();

  const bonusNumber = await ask(
    "보너스 번호를 입력해 주세요. ",
    InputValidator.validateBonusNumber
  );
  console.log();

  const winningLotto = new WinningLotto(
    new Lotto(winningNumbers.split(",").map((num) => Number(num))),
    new LottoNumber(Number(bonusNumber))
  );

  const { rankResult, totalPrice } = LottoChecker.checkLotto(
    winningLotto,
    lottos
  );

  print("당첨 통계");
  print("--------------------");
  printRankResult(rankResult);
  console.log();
  printTotalRateOfReturn(totalPrice, purchasePrice);
};

play();

const InputValidator = {
  validatePurchasePrice: (value) => {
    const price = Number(value);
    if (isNaN(price) || price <= 0 || price % 1000 !== 0) {
      return {
        isValid: false,
        errorMessage: "구입금액은 1000원 단위의 금액이어야 합니다.",
      };
    }

    return { isValid: true, errorMessage: null };
  },
  validateWinningNumbers: (value) => {
    const numbers = value.split(",").map((num) => Number(num));
    if (numbers.length !== 6) {
      return {
        isValid: false,
        errorMessage: "당첨 번호는 6개의 숫자로 구성되어야 합니다.",
      };
    }

    return { isValid: true, errorMessage: null };
  },
  validateBonusNumber: (value) => {
    const number = Number(value);
    if (isNaN(number) || number < 0 || number > 45) {
      return {
        isValid: false,
        errorMessage: "보너스 번호는 1~45 사이의 숫자여야 합니다.",
      };
    }

    return { isValid: true, errorMessage: null };
  },
};

function print(text) {
  console.log(text);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(lotto.numbers);
  });
}

function printRankResult(lottoResult) {
  RANKS.reverse().forEach((rank) => {
    console.log(
      `${LottoChecker.RANK_INFO[rank].matchingCount}개 일치${
        rank === 2 ? ", 보너스 볼 일치" : ""
      } (${LottoChecker.RANK_INFO[rank].price.toLocaleString()}원) - ${
        lottoResult[rank]
      }개`
    );
  });
}

function printTotalRateOfReturn(totalPrice, purchasePrice) {
  console.log(
    `총 수익률은 ${((totalPrice * 100) / purchasePrice).toFixed(1)}%입니다.`
  );
}
