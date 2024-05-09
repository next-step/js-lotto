import {
  errorLottoPurchasedAmount,
  errorLottoWinningNumbers,
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
    expect(logSpy).toHaveBeenCalledWith(
      errorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
    );
    expect(logSpy).toHaveBeenCalledWith(
      errorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
    );
    expect(lottoPurchasedAmount).toBe(1000);
  });

  test("로또 당첨 번호를 입력 받을 때 서로 다른 1이상 45이하의 정수 6개를 입력하면 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() =>
      Promise.resolve("1,2,3,4,5,6")
    );

    // when
    const winningNumbers = await Input.getWinningNumbers();

    // then
    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("로또 당첨 번호를 입력 받을 때 1이상 45이하의 정수 6개 중 겹치는 숫자가 있다면 에러메시지 출력 후 다시 입력을 받는다.", async () => {
    // given
    readLineAsyncSpy
      .mockImplementationOnce(() => Promise.resolve("1,1,2,2,3,3"))
      .mockImplementationOnce(() => Promise.resolve("1,2,3,4,5,6"));

    // when
    const winningNumbers = await Input.getWinningNumbers();

    // then
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(
      errorLottoWinningNumbers.ERROR_LOTTO_WINNING_NUMBERS_DUPLICATED
    );
    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
