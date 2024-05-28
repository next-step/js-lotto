import { ErrorLottoGameRestart } from "../src/js/constants/error";
import Input from "../src/js/view/console/Input";
import Output from "../src/js/view/console/Output";
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
    expect(lottoPurchasedAmount).toBe("10000");
  });

  test("로또 구매 금액으로 발급한 최대 개수의 로또의 수를 출력한다.", () => {
    // given
    const availableLottoCount = 10;

    // when
    Output.printGeneratedLottosCount(availableLottoCount);

    // then
    expect(logSpy).toHaveBeenCalledWith("10개를 구매했습니다.");
  });

  test("로또 당첨 번호를 입력 받을 때 서로 다른 1이상 45이하의 정수 6개를 입력하면 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() =>
      Promise.resolve("1,2,3,4,5,6")
    );

    // when
    const lottoNumbers = await Input.getWinningLottoNumbers();

    // then
    expect(lottoNumbers).toBe("1,2,3,4,5,6");
  });

  test("로또 보너스 번호를 입력 받을 때 1이상 45이하의 정수이면서 당첨번호로 선택한 수들과 다른 수를 입력하면 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() => Promise.resolve("7"));

    // when
    const bonusNumber = await Input.getBonusNumber();

    // then
    expect(bonusNumber).toBe("7");
  });

  test("발급한 로또들의 각 로또 번호들을 차례대로 출력한다.", () => {
    // given
    const lottoNumbers1 = [1, 2, 3, 4, 5, 6];
    const lottoNumbers2 = [12, 13, 14, 15, 16, 17];
    const lottosNumbers = [lottoNumbers1, lottoNumbers2];

    // when
    Output.printGeneratedLottosNumbers(lottosNumbers);

    // then
    expect(logSpy).toHaveBeenCalledWith("[1, 2, 3, 4, 5, 6]");
    expect(logSpy).toHaveBeenCalledWith("[12, 13, 14, 15, 16, 17]");
  });

  test("로또 당첨 결과를 출력한다.", () => {
    // given
    const lottoRankingStatistics = [
      {
        rankingWinningPrice: 5_000,
        rankingCondition: 3,
        isShowExtramMent: false,
        count: 1,
      },
      {
        rankingWinningPrice: 50_000,
        rankingCondition: 4,
        isShowExtraMent: false,
        count: 0,
      },
      {
        rankingWinningPrice: 1_500_000,
        rankingCondition: 5,
        isShowExtraMent: false,
        count: 0,
      },
      {
        rankingWinningPrice: 30_000_000,
        rankingCondition: 5,
        isShowExtraMent: true,
        count: 1,
      },
      {
        rankingWinningPrice: 2_000_000_000,
        rankingCondition: 6,
        isShowExtraMent: false,
        count: 1,
      },
    ];

    // when
    Output.printLottoRankingStatistics(lottoRankingStatistics);

    // then
    expect(logSpy).toHaveBeenCalledWith("\n당첨 통계\n--------------------");
    expect(logSpy).toHaveBeenCalledWith("3개 일치 (5,000원) - 1개");
    expect(logSpy).toHaveBeenCalledWith("4개 일치 (50,000원) - 0개");
    expect(logSpy).toHaveBeenCalledWith("5개 일치 (1,500,000원) - 0개");
    expect(logSpy).toHaveBeenCalledWith(
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 1개"
    );
    expect(logSpy).toHaveBeenCalledWith("6개 일치 (2,000,000,000원) - 1개");
  });

  test("로또 당첨 수익률을 출력한다.", () => {
    // given
    const totalLottoProfitRate = 62.5;

    // when
    Output.printLottoProfitRate(totalLottoProfitRate);

    // then
    expect(logSpy).toHaveBeenCalledWith(`총 수익률은 62.5%입니다.`);
  });

  test("당첨 통계를 출력한 뒤에는 재시작/종료 여부를 y 또는 n으로 입력 받는다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() =>
      Promise.resolve(Input.RESTART_GAME_TRUE)
    );

    // when
    const isRestartLottoGame = await Input.getIsRestartLottoGame();

    // then
    expect(isRestartLottoGame).toBe(true);
  });

  test.each(["123", "N", -1])(
    "로또 게임 재시작 여부가 y 또는 n이 아닌 경우 에러가 발생한다.",
    (input) => {
      // given

      // when
      const validate = () => {
        Input.validateIsRestartLottoGame(input);
      };

      // then
      expect(validate).toThrow(
        ErrorLottoGameRestart.ERROR_LOTTO_GAME_RESTART_NOT_VALID
      );
    }
  );
});
