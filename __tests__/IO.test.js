import {
  ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER,
  ERROR_LOTTO_PURCHASED_AMOUNT_TOO_SMALL,
} from "../src/constants/error";
import Input from "../src/js/view/Input";
import * as io from "../src/utils/readlineAsync";

const logSpy = jest.spyOn(console, "log");
const readLineAsyncSpy = jest.spyOn(io, "readLineAsync");

beforeEach(() => {
  readLineAsyncSpy.mockClear();
  logSpy.mockClear();
});

describe("입출력 기능 테스트", () => {
  test("로또를 구매할 금액을 입력받을 때 0 이상의 실수가 입력되면 정상적으로 입력이 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() => Promise.resolve("10000"));

    // when
    const lottoPurchasedAmount = await Input.getLottoPurchasedAmount();

    // then
    expect(lottoPurchasedAmount).toBe(10000);
  });

  test("로또를 구매할 금액을 입력받을 때 0 미만이거나 숫자가 아니면 에러메시지 출력 후 다시 입력을 받는다.", async () => {
    // given
    readLineAsyncSpy
      .mockImplementationOnce(() => Promise.resolve("-1"))
      .mockImplementationOnce(() => Promise.resolve("가나다"))
      .mockImplementationOnce(() => Promise.resolve("1000"));

    // when
    const lottoPurchasedAmount = await Input.getLottoPurchasedAmount();

    // then
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(ERROR_LOTTO_PURCHASED_AMOUNT_TOO_SMALL);
    expect(logSpy).toHaveBeenCalledWith(
      ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
    );
    expect(lottoPurchasedAmount).toBe(1000);
  });
});
