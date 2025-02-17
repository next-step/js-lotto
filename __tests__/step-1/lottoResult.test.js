import LottoResult from "../../src/domain/LottoResult/LottoResult";
import LOTTO_RESULT_ERROR_MESSAGE from "../../src/domain/LottoResult/lottoResultErrorMessage";

describe("Lotto Result Class Test .", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const ticket = [1, 2, 3, 4, 5, 6];
  let lottoResult;

  beforeEach(() => {
    lottoResult = new LottoResult(winningNumbers, bonusNumber);
  });

  it("N개의 로또 티켓을 비교하여 {ticket - origin ticket값을, match - 일치하는 값을 갖고있는 배열, hasBonus - 보너스 번호 일치 여부}를 배열로 return 한다.", () => {
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

  it("당첨 번호가 1미만, 45초과된다면 INVALID_WINNING_NUMBER_RANGE 에러를 throw 한다.", () => {
    const errorNumbers = [0, -1, 45, 23, 1, 2];

    expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
      LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE
    );
  });

  it("당첨 번호가 1미만, 45초과 시 INVALID_BONUS_NUMBER_RANGE 에러를 throw 한다.", () => {
    const errorBonusNumber = 99;

    expect(() => new LottoResult(winningNumbers, errorBonusNumber)).toThrow(
      LOTTO_RESULT_ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE
    );
  });

  it("당첨 번호가 6자리 미만 이거나, 초과 된다면 INVALID_WINNING_NUMBERS_LENGTH를 throw 한다.", () => {
    const errorNumbers = [1, 2, 3, 4, 5];

    expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
      LOTTO_RESULT_ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
    );
  });

  it("보너스 번호가 입력되지 않으면 BONUS_NUMBER_REQUIRED를 throw 한다.", () => {
    expect(() => new LottoResult(winningNumbers)).toThrow(
      LOTTO_RESULT_ERROR_MESSAGE.BONUS_NUMBER_REQUIRED
    );
  });

  it("당첨번호와 보너스숫자에 중복이 있으면 DUPLICATE_NUMBERS_NOT_ALLOWED를 throw 한다.", () => {
    const errorNumbers = [1, 2, 3, 4, 5, 5];

    expect(() => new LottoResult(errorNumbers, bonusNumber)).toThrow(
      LOTTO_RESULT_ERROR_MESSAGE.DUPLICATE_NUMBERS_NOT_ALLOWED
    );
  });

  describe("로또 당첨 비교 테스트", () => {
    it("티켓이 모든 당첨 번호와 일치하는 경우 ticket 과 match 는 같은 값을 갖고있는 배열을 hasBonus는 false 인 객체가 return 된다.", () => {
      const result = lottoResult.compareSingleTicket(ticket);
      expect(result).toEqual({
        ticket,
        matchedNumbers: [1, 2, 3, 4, 5, 6],
        hasBonus: false,
      });
    });

    it("티켓이 보너스 번호만 일치하는 경우 ticket은 그대로 반환되고 match는 빈배열 hasBonus는 true 인 객체가 return 된다.", () => {
      const ticket = [7, 8, 9, 10, 11, 12];
      const result = lottoResult.compareSingleTicket(ticket);
      expect(result).toEqual({
        ticket,
        matchedNumbers: [],
        hasBonus: true,
      });
    });

    it("티켓과 당첨번호가 1개만 일치하고 bonus번호가 일치한다면 match는 1개의 값만 들어있고, hasBonus true인 객체가 return 된다.", () => {
      const ticket = [1, 7, 8, 9, 10, 11];
      const result = lottoResult.compareSingleTicket(ticket);
      expect(result).toEqual({
        ticket,
        matchedNumbers: [1],
        hasBonus: true,
      });
    });
  });
});
