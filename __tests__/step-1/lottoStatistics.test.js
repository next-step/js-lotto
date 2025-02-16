import LOTTO_ERROR_MESSAGE from "../../src/utils/errorMessage/lottoErrorMessage";
import LOTTO_STATISTICS_ERROR_MESSAGE from "../../src/utils/errorMessage/lottoStatisticsErrorMessage";
import LottoStatistics from "../../src/domain/LottoStatistics";
import {
  LOTTO_MONEY,
  LOTTO_MONEY_ERROR,
  LOTTO_MONEY_MIN_ERROR,
  LOTTO_RANK_MONEY,
} from "../../src/utils/ENUM/lotto";

describe("로또 당첨 결과 테스트", () => {
  it("등수를 입력 받아 저장할 수 있다.", () => {
    const rankList = [1, 3, 3, 2];
    const lottoStatistics = new LottoStatistics(LOTTO_MONEY);
    rankList.forEach((rank) => {
      lottoStatistics.setLottoRank(rank);
    });
    expect(lottoStatistics.lottoRankList).toEqual(rankList);
  });

  it("각 로또가 몇개 당첨되었는지 저장한다.", () => {
    const lottoStatistics = new LottoStatistics(LOTTO_MONEY);
    const rankList = [1, 3, 3, 2];

    rankList.forEach((rank) => {
      lottoStatistics.setLottoRank(rank);
    });
    const result = lottoStatistics.setLottoResult();

    expect(result).toEqual({
      FIRST: 1,
      SECOND: 1,
      THIRD: 2,
      FOURTH: 0,
      FIFTH: 0,
    });
  });

  it("저장된 정보를 토대로 수익률을 계산할 수 있다.", () => {
    const lottoStatistics = new LottoStatistics(8000);
    const rankList = [5];

    rankList.forEach((rank) => {
      lottoStatistics.setLottoRank(rank);
    });
    const result = lottoStatistics.setLottoResult();
    const totalWinningPrice = LottoStatistics.totalWinning(result);

    expect(lottoStatistics.calculateROI(totalWinningPrice)).toBe(62.5);
  });

  describe("당첨번호와 일치하는 유저 정보를 받아 등수를 지정할 수 있다.", () => {
    let lottoStatistics;
    beforeEach(() => {
      lottoStatistics = new LottoStatistics(LOTTO_MONEY);
    });
    it("모두 일치하고 보너스 번호가 일치하지 않는 경우", () => {
      const lottoRank = lottoStatistics.getLottoRank([1, 2, 3, 4, 5, 6], false);

      expect(lottoRank).toBe(1);
    });

    it("5개가 일치하고 보너스 번호가 일치하는 경우", () => {
      const lottoRank = lottoStatistics.getLottoRank([1, 2, 3, 4, 5], true);

      expect(lottoRank).toBe(2);
    });

    it("5개가 일치하고 보너스 번호가 일차하지 않는 경우", () => {
      const lottoRank = lottoStatistics.getLottoRank([1, 2, 3, 4, 5], false);

      expect(lottoRank).toBe(3);
    });

    it("4개가 일치하고 보너스 번호가 일치하는 경우", () => {
      const lottoRank = lottoStatistics.getLottoRank([1, 2, 3, 4], true);

      expect(lottoRank).toBe(4);
    });
    it("3개가 일치하고 보너스번호가 일치하는 경우", () => {
      const lottoRank = lottoStatistics.getLottoRank([1, 2, 3], true);

      expect(lottoRank).toBe(5);
    });
  });

  describe("등수에 따라 금액을 리턴할 수 있다.", () => {
    it("1등", () => {
      const calculateLottoPrize = LottoStatistics.calculateLottoPrize(1);

      expect(calculateLottoPrize).toBe(LOTTO_RANK_MONEY.FIRST);
    });

    it("2등", () => {
      const calculateLottoPrize = LottoStatistics.calculateLottoPrize(2);

      expect(calculateLottoPrize).toBe(LOTTO_RANK_MONEY.SECOND);
    });

    it("5등", () => {
      const calculateLottoPrize = LottoStatistics.calculateLottoPrize(5);

      expect(calculateLottoPrize).toBe(LOTTO_RANK_MONEY.FIFTH);
    });
  });

  describe("로또 당첨 결과 에러 테스트", () => {
    it("로또 구입 금액이 최소금액보다 낮으면 에러를 발생 시킨다.", () => {
      expect(() => new LottoStatistics(LOTTO_MONEY_MIN_ERROR)).toThrow(
        LOTTO_ERROR_MESSAGE.MIN_ORDER_AMOUNT
      );
    });

    it("로또 구입 금액이 1000원 단위 미만 (3500) 이면 에러를 발생 시킨다.", () => {
      expect(() => new LottoStatistics(LOTTO_MONEY_ERROR)).toThrow(
        LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT
      );
    });

    it("5이상의 등수가 입력되면 에러가 throw 된다.", () => {
      expect(() => LottoStatistics.calculateLottoPrize(7)).toThrow(
        LOTTO_STATISTICS_ERROR_MESSAGE.INVALID_LOTTO_LANK
      );
    });
  });
});
