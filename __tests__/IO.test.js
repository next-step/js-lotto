import {
  ErrorLottoBonusNumber,
  ErrorLottoPurchasedAmount,
  ErrorLottoWinningNumbers,
} from "../src/constants/error";
import Lotto from "../src/js/domain/Lotto";
import LottoResult from "../src/js/domain/LottoResult";
import Input from "../src/js/view/Input";
import Output from "../src/js/view/Output";
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
      ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE
    );
    expect(logSpy).toHaveBeenCalledWith(
      ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER
    );
    expect(lottoPurchasedAmount).toBe(1000);
  });

  test("로또 구매 금액으로 발급한 최대 개수의 로또의 수를 출력한다.", () => {
    // given
    const purchasedAmount = 10001;
    const lottos = Lotto.generateLottos(purchasedAmount);

    // when
    Output.printGeneratedLottosCount(lottos.length);

    // then
    expect(logSpy).toHaveBeenCalledWith("10개를 구매했습니다.");
  });

  test("발급된 로또들의 각 로또의 로또 번호들을 출력한다.", () => {
    // given
    const purchasedAmount = 10001;
    const lottos = Lotto.generateLottos(purchasedAmount);

    // when
    Output.printGeneratedLottosNumbers(lottos);

    // then
    const regex = /^\[(\d+,\s?)+\d+\]$/;
    expect(logSpy).toHaveBeenCalledTimes(10);
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(regex));
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
      ErrorLottoWinningNumbers.ERROR_LOTTO_WINNING_NUMBERS_DUPLICATED
    );
    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("로또 보너스 번호를 입력 받을 때 1이상 45이하의 정수이면서 당첨번호로 선택한 수들과 다른 수를 입력 하면 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() => Promise.resolve("7"));
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const bonusNumber = await Input.getBonusNumber(winningNumbers);

    // then
    expect(bonusNumber).toBe(7);
  });

  test("로또 보너스 번호를 입력 받을 때 1이상 45이하의 정수이면서 당첨번호로 선택한 수들과 겹치면 에러 메시지 출력 후 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy
      .mockImplementationOnce(() => Promise.resolve("6"))
      .mockImplementationOnce(() => Promise.resolve("7"));
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const bonusNumber = await Input.getBonusNumber(winningNumbers);

    // then
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(
      ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
    );
    expect(bonusNumber).toBe(7);
  });

  test("로또 당첨 결과를 출력한다.", () => {
    // given
    const lottoPurchasedAmount = 3000;
    const lottos = Lotto.generateLottos(lottoPurchasedAmount);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);
    const lottoRankingStatistics =
      lottoResult.getLottoRankingStatistics(lottos);

    // when
    Output.printLottoRankingStatistics(lottoRankingStatistics);

    // then
    expect(logSpy).toHaveBeenCalledWith("\n당첨 통계\n--------------------");
    expect(logSpy).toHaveBeenCalledTimes(6);
  });

  test("로또 당첨 수익률을 출력한다.", () => {
    // given
    const lottoPurchasedAmount = 8000;
    const lottos = Lotto.generateLottos(lottoPurchasedAmount);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);
    const totalLottoWinningPrice =
      lottoResult.getTotalLottoWinningPrice(lottos);
    const totalLottoProfitRate = LottoResult.getTotalLottoProfitRate(
      totalLottoWinningPrice,
      lottoPurchasedAmount
    );

    // when
    Output.printLottoProfitRate(totalLottoProfitRate);

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `총 수익률은 ${totalLottoProfitRate}%입니다.`
    );
  });
});
