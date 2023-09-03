import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from "../src/data/constant.js";
import {
  isValidWinningNumberRange,
  isWinningAndBonusNumberDuplicate,
  isWinningNumbersDuplicate,
  isValidWinningNumberLength,
} from "../src/utils/validate.js";

describe("당첨 번호와 보너스 번호 입력 정상 케이스 입니다.", () => {
  test("입력 가능한 당첨 번호의 범위는 1~45입니다.", () => {
    expect(() => isValidWinningNumberRange("1,2,3,5,6,7")).not.toThrow();
  });

  test("당첨 번호는 중복될 수 없습니다.", () => {
    expect(() => isWinningNumbersDuplicate("1,2,3,4,5,6")).not.toThrow();
  });

  test("사용자의 당첨 번호는 6개의 숫자로 이루어져 있습니다.", () => {
    const validValues = ["1,2,3,4,5,6", "1, 2, 3, 4, 5, 6"];

    validValues.forEach((values) => {
      expect(() => isValidWinningNumberLength(values)).not.toThrow();
    });
  });

  test("보너스 번호는 1~45까지의 숫자만 입력할 수 있습니다.", () => {
    const validValues = ["1", "45"];

    validValues.forEach((values) => {
      expect(() => isValidWinningNumberRange(values)).not.toThrow();
    });
  });

  test("당첨 번호와 보너스 번호는 중복될 수 없습니다.", () => {
    const winningNumbers = ["1", "2", "3", "4", "5", "7"];
    const bonusNumber = "8";

    expect(() =>
      isWinningAndBonusNumberDuplicate(winningNumbers, bonusNumber)
    ).not.toThrow();
  });
});

describe("당첨 번호와 보너스 번호 입력 예외 케이스 입니다.", () => {
  test("입력 가능한 당첨 번호의 범위는 1~45입니다.", () => {
    const invalidValues = ["0,2,3,5,6,7", "1,2,3,5,6,50", "0,2,3,5,6,47"];

    invalidValues.forEach((values) => {
      expect(() => isValidWinningNumberRange(values)).toThrow(
        `로또 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER}까지의 숫자만 입력 가능합니다.`
      );
    });
  });

  test("당첨 번호는 중복될 수 없습니다.", () => {
    expect(() => isWinningNumbersDuplicate("3,4,6,6,7,8")).toThrow(
      "당첨 번호 내에서 중복된 값을 사용할 수 없습니다."
    );
  });

  test("사용자의 당첨 번호는 6개의 숫자로 이루어져 있습니다.", () => {
    const invalidValues = ["1,2,3,4,5", "1", "1,2,3,4,5,6,7,8,9"];

    invalidValues.forEach((values) => {
      expect(() => isValidWinningNumberLength(values)).toThrow(
        "입력하신 당첨 번호의 개수를 확인해주세요."
      );
    });
  });

  test("보너스 번호는 1~45까지의 숫자만 입력할 수 있습니다.", () => {
    const invalidValues = ["47", "-4"];

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
