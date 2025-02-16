import LottoResult from "../../src/domain/LottoResult";
import LOTTO_RESULT_ERROR_MESSAGE from "../../src/utils/errorMessage/lottoResultErrorMessage";

describe("로또 .", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const ticket = [1, 2, 3, 4, 5, 6];
  let lottoResult;

  beforeEach(() => {
    lottoResult = new LottoResult(winningNumbers, bonusNumber);
  });

  it("당첨번호와 보너스 번호를 받아 저장할 수 있다.", () => {
    const winnerNumbers = lottoResult.getWinnersNumber();
    expect(winnerNumbers.winningNumbers).toEqual(winningNumbers);
    expect(winnerNumbers.bonusNumber).toBe(bonusNumber);
  });

  describe("로또 당첨 비교 테스트", () => {
    it("티켓이 모든 당첨 번호와 일치하는 경우", () => {
      const result = LottoResult.compareSingleTicket(
        ticket,
        winningNumbers,
        bonusNumber
      );
      expect(result).toEqual({
        ticket,
        matchedNumbers: [1, 2, 3, 4, 5, 6],
        hasBonus: false,
      });
    });

    it("티켓에 보너스 번호만 포함된 경우", () => {
      const ticket = [7, 8, 9, 10, 11, 12];
      const result = LottoResult.compareSingleTicket(
        ticket,
        winningNumbers,
        bonusNumber
      );
      expect(result).toEqual({
        ticket,
        matchedNumbers: [],
        hasBonus: true,
      });
    });

    it("티켓에 일부 당첨 번호와 보너스 번호가 포함된 경우", () => {
      const ticket = [1, 7, 8, 9, 10, 11];
      const result = LottoResult.compareSingleTicket(
        ticket,
        winningNumbers,
        bonusNumber
      );
      expect(result).toEqual({
        ticket,
        matchedNumbers: [1],
        hasBonus: true,
      });
    });
  });

  it("여러 티켓을 올바르게 비교하는지 테스트", () => {
    const tickets = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [1, 7, 8, 9, 10, 11],
    ];

    const result = lottoResult.compareNumber(tickets);

    expect(result).toEqual([
      {
        ticket: [1, 2, 3, 4, 5, 6],
        matchedNumbers: [1, 2, 3, 4, 5, 6],
        hasBonus: false,
      },
      {
        ticket: [7, 8, 9, 10, 11, 12],
        matchedNumbers: [],
        hasBonus: true,
      },
      {
        ticket: [1, 7, 8, 9, 10, 11],
        matchedNumbers: [1],
        hasBonus: true,
      },
    ]);
  });

  describe("예외 케이스", () => {
    it("당첨 번호는 1미만, 45초과 이면 에러를 뱉는다.", () => {
      const errorNumbers = [0, -1, 45, 23, 1, 2];

      expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
        LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE
      );
    });

    it("보너스번호는 1미만, 45초과 이면 에러를 뱉는다.", () => {
      const errorBonusNumber = 99;

      expect(() => new LottoResult(winningNumbers, errorBonusNumber)).toThrow(
        LOTTO_RESULT_ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE
      );
    });

    it("당첨 번호가 6자리가 아니면 에러를 뱉는다.", () => {
      const errorNumbers = [1, 2, 3, 4, 5];

      expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
        LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
      );
    });

    it("보너스 번호가 없으면 에러를 뱉는다.", () => {
      expect(() => new LottoResult(winningNumbers)).toThrow(
        LOTTO_RESULT_ERROR_MESSAGE.BONUS_NUMBER_REQUIRED
      );
    });

    it("당첨번호와 보너스숫자에 중복이 있으면 에러를 뱉는다.", () => {
      const errorNumbers = [1, 2, 3, 4, 5, 5];

      expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
        LOTTO_RESULT_ERROR_MESSAGE.DUPLICATE_NUMBERS_NOT_ALLOWED
      );
    });
  });
});
