import { SINGLE_LOTTO_PRICE } from "../src/data/constant.js";
import { calcLottoCount } from "../src/utils/calculate.js";
import {
  validateAmount,
  validateInputPriceType,
  validateInputPriceUnit,
} from "../src/utils/validate.js";

describe("로또 구입 정상 케이스입니다.", () => {
  test("로또 구입 금액은 숫자만 입력 가능 합니다.", () => {
    expect(() => validateInputPriceType(3000)).not.toThrow();
  });

  test("로또 1장의 가격은 1000원 입니다.", () => {
    const inputPrice = [4000, 5000, 1000];

    inputPrice.forEach((price) => {
      expect(calcLottoCount(price)).toBe(price / SINGLE_LOTTO_PRICE);
    });
  });
});

describe("로또 구입 예외 케이스입니다.", () => {
  test("로또 구입 금액 입력 값에 숫자 이외의 값은 허용되지 않습니다.", () => {
    const invalidValue = ["안녕하세요", "안녕hello", "33 333", " "];

    invalidValue.forEach((value) => {
      expect(() => validateInputPriceType(value)).toThrow(
        "금액은 숫자만 입력 가능하며 빈 값은 허용되지 않습니다."
      );
    });
  });

  test("구입 금액 입력 시 음수 또는 0은 입력할 수 없습니다.", () => {
    const invalidPrice = [-344, 0];

    invalidPrice.forEach((price) => {
      expect(() => {
        validateAmount(price).toThrow("입력한 금액은 0보다 커야합니다.");
      });
    });
  });

  test("구매 금액은 1000원 단위만 입력해야 합니다.", () => {
    expect(() => validateInputPriceUnit(16000)).not.toThrow();

    const invalidPrice = [450, 12345, 5555];

    invalidPrice.forEach((price) => {
      expect(() =>
        validateInputPriceUnit(price).toThrow(
          `금액은 ${SINGLE_LOTTO_PRICE}원 단위로 입력 가능합니다.`
        )
      );
    });
  });
});
