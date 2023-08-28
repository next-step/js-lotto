import {
  createLottosForAmount,
  getWinningPrizeResult,
} from "../src/controller/lottoController.js";
import {
  SINGLE_LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../src/data/constant.js";
import { calcLottoCount } from "../src/utils/calculate.js";
import {
  checkInputPriceType,
  checkInputPriceUnit,
  isValidAmount,
  isValidWinningNumberRange,
  isWinningAndBonusNumberDuplicate,
  isWinningNumbersDuplicate,
  isValidWinningNumberLength,
} from "../src/utils/validate.js";
import { displayWinningStats } from "../src/view/view.js";

describe("로또를 구입합니다.", () => {
  test("구입 금액 입력 시 숫자만 입력 가능 합니다.", () => {
    expect(() => checkInputPriceType(3000)).not.toThrow();

    const invalidValue = ["3000", "안녕하세요", "안녕hello", "33 333", " "];

    invalidValue.forEach((value) => {
      expect(() => checkInputPriceType(value)).toThrow(
        "금액은 숫자만 입력 가능하며 빈 값은 허용되지 않습니다."
      );
    });
  });

  test("구입 금액 입력 시 음수 또는 0은 입력할 수 없습니다.", () => {
    const invalidPrice = [-344, 0];

    invalidPrice.forEach((price) => {
      expect(() => {
        isValidAmount(price).toThrow("입력한 금액은 0보다 커야합니다.");
      });
    });
  });

  test("구매 금액은 1000원 단위만 입력해야 합니다.", () => {
    expect(() => checkInputPriceUnit(16000)).not.toThrow();

    const invalidPrice = [450, 12345, 5555];

    invalidPrice.forEach((price) => {
      expect(() =>
        checkInputPriceUnit(price).toThrow(
          `금액은 ${SINGLE_LOTTO_PRICE}원 단위로 입력 가능합니다.`
        )
      );
    });
  });

  test("로또 1장의 가격은 1000원 입니다.", () => {
    const inputPrice = [4000, 5000, 1000];

    inputPrice.forEach((price) => {
      expect(calcLottoCount(price)).toBe(price / SINGLE_LOTTO_PRICE);
    });
  });
});

describe("구입한 로또 번호를 확인합니다.", () => {
  const availableLottoTicketsCount = 3;
  const lottoNumbers = createLottosForAmount(availableLottoTicketsCount);

  test("로또 번호는 6개의 숫자로 이루어져 있습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      expect(numberArr).toHaveLength(6);

      numberArr.forEach((number) => {
        expect(typeof number).toBe("number");
      });
    });
  });

  test("로또 번호들은 1 ~ 45까지의 수로 되어있습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      numberArr.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  test("하나의 로또 번호 내에서는 중복이 될 수 없습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      const uniqueLottoNumbers = new Set(numberArr);
      expect(uniqueLottoNumbers.size).toBe(numberArr.length);
    });
  });
});

describe("당첨 번호와 보너스 번호를 입력합니다.", () => {
  test("당첨 번호는 1~45까지의 숫자만 입력할 수 있습니다.", () => {
    expect(() => isValidWinningNumberRange("1,2,3,5,6,7")).not.toThrow();

    const invalidValues = ["0,2,3,5,6,7", "1,2,3,5,6,50", "0,2,3,5,6,47"];

    invalidValues.forEach((values) => {
      expect(() => isValidWinningNumberRange(values)).toThrow(
        `로또 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER}까지의 숫자만 입력 가능합니다.`
      );
    });
  });

  test("당첨 번호 내에서 중복된 값이 있을 수 없습니다.", () => {
    expect(() => isWinningNumbersDuplicate("1,2,3,4,5,6")).not.toThrow();
    expect(() => isWinningNumbersDuplicate("3,4,6,6,7,8")).toThrow(
      "당첨 번호 내에서 중복된 값을 사용할 수 없습니다."
    );
  });

  test("사용자의 당첨 번호는 6개의 숫자로 이루어져 있습니다.", () => {
    const invalidValues = ["1,2,3,4,5", "1", "1,2,3,4,5,6,7,8,9"];
    const validValues = ["1,2,3,4,5,6", "1, 2, 3, 4, 5, 6"];

    invalidValues.forEach((values) => {
      expect(() => isValidWinningNumberLength(values)).toThrow(
        "입력하신 당첨 번호의 개수를 확인해주세요."
      );
    });

    validValues.forEach((values) => {
      expect(() => isValidWinningNumberLength(values)).not.toThrow();
    });
  });

  test("보너스 번호는 1~45까지의 숫자만 입력할 수 있습니다.", () => {
    const validValues = ["1", "45"];
    const invalidValues = ["47", "-4"];

    validValues.forEach((values) => {
      expect(() => isValidWinningNumberRange(values)).not.toThrow();
    });

    invalidValues.forEach((values) => {
      expect(() => isValidWinningNumberRange(values)).toThrow(
        `로또 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER}까지의 숫자만 입력 가능합니다.`
      );
    });
  });

  test("당첨 번호와 보너스 번호는 중복될 수 없습니다.", () => {
    const winningNumbers = ["1", "2", "3", "4", "5", "7"];
    const bonusNumber = "7";

    expect(() =>
      isWinningAndBonusNumberDuplicate(winningNumbers, bonusNumber)
    ).toThrow("당첨 번호와 보너스 번호는 중복될 수 없습니다.");
  });
});

describe("로또 번호와 당첨 번호를 비교한 후 수익률을 출력합니다.", () => {
  const lottoNumbers = [
    [1, 2, 3, 4, 5, 6],
    [2, 24, 34, 6, 7, 19],
    [33, 3, 6, 8, 10, 9],
  ];

  test("6개의 번호가 모두 일치하여 1등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 7, 19, 45];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("5개의 번호와 보너스 번호가 일치하여 2등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("5개의 번호가 모두 일치하여 3등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 8, 12, 45];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("4개의 번호가 모두 일치하여 4등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 35, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("3개의 번호가 모두 일치하여 5등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 25, 35, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });
});
