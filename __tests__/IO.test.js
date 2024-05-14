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

  test("발급된 로또들의 각 로또의 로또 번호들을 출력한다.", () => {
    // given
    const lottosCount = 10;
    const lottos = [];

    for (let i = 0; i < lottosCount; i++) {
      const lottoNumbers = Lotto.generateRandomLottoNumbers();
      lottos.push(new Lotto(lottoNumbers));
    }

    // when
    Output.printGeneratedLottosNumbers(lottos);

    // then
    const regex = /^\[(\d+,\s?)+\d+\]$/;
    expect(logSpy).toHaveBeenCalledTimes(lottosCount);
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
    expect(winningNumbers).toEqual("1,2,3,4,5,6");
  });

  test("로또 보너스 번호를 입력 받을 때 1이상 45이하의 정수이면서 당첨번호로 선택한 수들과 다른 수를 입력 하면 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() => Promise.resolve("7"));
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const bonusNumber = await Input.getBonusNumber(winningNumbers);

    // then
    expect(bonusNumber).toBe("7");
  });

  test("로또 당첨 결과를 출력한다.", () => {
    // given
    const lottoRankingStatistics = [
      {
        rankingWinningPrice: LottoResult.LottoRanking[5].winningPrice,
        rankingCondition: LottoResult.LottoRanking[5].condition,
        isShowExtramMent: false,
        count: 1,
      },
      {
        rankingWinningPrice: LottoResult.LottoRanking[4].winningPrice,
        rankingCondition: LottoResult.LottoRanking[4].condition,
        isShowExtraMent: false,
        count: 0,
      },
      {
        rankingWinningPrice: LottoResult.LottoRanking[3].winningPrice,
        rankingCondition: LottoResult.LottoRanking[3].condition,
        isShowExtraMent: false,
        count: 0,
      },
      {
        rankingWinningPrice: LottoResult.LottoRanking[2].winningPrice,
        rankingCondition: LottoResult.LottoRanking[2].condition,
        isShowExtraMent: true,
        count: 1,
      },
      {
        rankingWinningPrice: LottoResult.LottoRanking[1].winningPrice,
        rankingCondition: LottoResult.LottoRanking[1].condition,
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
});
