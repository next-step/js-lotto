import { SINGLE_LOTTO_PRICE } from "../src/data/constant.js";
import { calcLottoCount } from "../src/utils/calculate.js";
import {
  checkInputPriceType,
  checkInputPriceUnit,
  isValidAmount,
} from "../src/utils/validate.js";

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
  // test("로또 번호는 6개의 숫자로 이루어져 있습니다.");
  // test("로또 번호들은 1 ~ 45까지의 수로 되어있습니다.");
  // test("하나의 로또 번호 내에서는 중복이 될 수 없습니다.");
});

// describe("당첨 번호와 보너스 번호를 입력합니다.", () => {
//   test("당첨 번호는 1~45까지의 숫자만 입력할 수 있습니다.");

//   test("당첨 번호 입력은 콤마로 구분합니다.");

//   test("당첨 번호 내에서 중복된 값이 있을 수 없습니다.");

//   test("보너스 번호는 1~45까지의 숫자만 입력할 수 있습니다.");

//   test("당첨 번호와 보너스 번호는 중복될 수 없습니다.");

//   test("사용자의 당첨 번호는 6개의 숫자로 이루어져 있습니다.");
// });

// describe("로또 번호와 당첨 번호를 비교한 후 수익률을 출력합니다.", () => {
//   test("6개의 번호가 모두 일치하여 1등 당첨입니다.");

//   test("5개의 번호와 보너스 번호가 일치하여 2등 당첨입니다.");

//   test("5개의 번호가 모두 일치하여 3등 당첨입니다.");

//   test("4개의 번호가 모두 일치하여 4등 당첨입니다.");

//   test("3개의 번호가 모두 일치하여 5등 당첨입니다.");

//   test("모두 일치하지 않거나 1~2개의 번호만 일치할 경우 낙첨입니다.");
// });
