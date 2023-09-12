import {
  DUPLICATE_BONUS_NUMBER_ERROR_MESSAGE,
  DUPLICATE_WINNING_NUMBERS_ERROR_MESSAGE,
  FIFTH_PLACE_WINNING_AMOUNT,
  FIRST_PLACE_WINNING_AMOUNT,
  FOURTH_PLACE_WINNING_AMOUNT,
  LOTTO_MAX_NUM,
  LOTTO_MIN_NUM,
  LOTTO_TICKET_PRICE,
  MONEY_RANGE_ERROR_MESSAGE,
  MONEY_TYPE_ERROR_MESSAGE,
  MONEY_UNIT_ERROR_MESSAGE,
  NUMBER_RANGE_ERROR_MESSAGE,
  NUMBER_TYPE_ERROR_MESSAGE,
  SECOND_PLACE_WINNING_AMOUNT,
  THIRD_PLACE_WINNING_AMOUNT,
  WINNING_NUMBERS_LENGTH_ERROR_MESSAGE,
} from "../src/js/constants.js";
import LottoController from "../src/js/controllers/step1/LottoController.js";
import LottoTicket from "../src/js/models/LottoTicket.js";

const FIRST_PLACE_IDX = 4;
const SECOND_PLACE_IDX = 3;
const THIRD_PLACE_IDX = 2;
const FOURTH_PLACE_IDX = 1;
const FIFTH_PLACE_IDX = 0;

describe(`로또 당첨 번호 테스트: `, () => {
  it(`로또 번호는 ${LOTTO_MIN_NUM}에서 ${LOTTO_MAX_NUM} 사이여야 한다.`, () => {
    const lottoController = new LottoController();
    const winningNumbers = lottoController.drawLottoNumbers();

    winningNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_MIN_NUM);
      expect(number).toBeLessThanOrEqual(LOTTO_MAX_NUM);
    });
  });
});

describe(`로또 구입 테스트: `, () => {
  it("로또 구입 금액으로 8,000원을 입력하면 로또 8장이 발행되어야 한다.", () => {
    const lottoController = new LottoController();
    const lottoTickets = lottoController.issueLottoTickets(8000);

    expect(lottoTickets.length).toBe(8);
  });
});

describe(`로또 당첨 테스트: `, () => {
  const lottoController = new LottoController();
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  describe(`6개의 숫자가 일치하면`, () => {
    const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 6]);

    lottoController.exportStatistics({ lottoTicket, winningNumbers, bonusNumber });

    it(`1등에 당첨되고,`, () => {
      expect(lottoTicket.getPlaceIdx()).toBe(FIRST_PLACE_IDX);
    });

    it(`${FIRST_PLACE_WINNING_AMOUNT}원을 수령한다.`, () => {
      expect(lottoTicket.getWinningAmount()).toBe(FIRST_PLACE_WINNING_AMOUNT);
    });
  });

  describe(`5개의 숫자가 일치하고, 보너스 번호가 포함되면`, () => {
    const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 7]);

    lottoController.exportStatistics({ lottoTicket, winningNumbers, bonusNumber });

    it(`2등에 당첨되고,`, () => {
      expect(lottoTicket.getPlaceIdx()).toBe(SECOND_PLACE_IDX);
    });

    it(`${SECOND_PLACE_WINNING_AMOUNT}원을 수령한다.`, () => {
      expect(lottoTicket.getWinningAmount()).toBe(SECOND_PLACE_WINNING_AMOUNT);
    });
  });

  describe(`5개의 숫자가 일치하면`, () => {
    const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 8]);

    lottoController.exportStatistics({ lottoTicket, winningNumbers, bonusNumber });

    it(`3등에 당첨되고,`, () => {
      expect(lottoTicket.getPlaceIdx()).toBe(THIRD_PLACE_IDX);
    });

    it(`${THIRD_PLACE_WINNING_AMOUNT}원을 수령한다.`, () => {
      expect(lottoTicket.getWinningAmount()).toBe(THIRD_PLACE_WINNING_AMOUNT);
    });
  });

  describe(`4개의 숫자가 일치하면`, () => {
    const lottoTicket = new LottoTicket([1, 2, 3, 4, 8, 9]);

    lottoController.exportStatistics({ lottoTicket, winningNumbers, bonusNumber });

    it(`4등에 당첨되고,`, () => {
      expect(lottoTicket.getPlaceIdx()).toBe(FOURTH_PLACE_IDX);
    });

    it(`${FOURTH_PLACE_WINNING_AMOUNT}원을 수령한다.`, () => {
      expect(lottoTicket.getWinningAmount()).toBe(FOURTH_PLACE_WINNING_AMOUNT);
    });
  });

  describe(`3개의 숫자가 일치하면`, () => {
    const lottoTicket = new LottoTicket([1, 2, 3, 8, 9, 10]);

    lottoController.exportStatistics({ lottoTicket, winningNumbers, bonusNumber });
    it(`5등에 당첨되고,`, () => {
      expect(lottoTicket.getPlaceIdx()).toBe(FIFTH_PLACE_IDX);
    });

    it(`${FIFTH_PLACE_WINNING_AMOUNT}원을 수령한다.`, () => {
      expect(lottoTicket.getWinningAmount()).toBe(FIFTH_PLACE_WINNING_AMOUNT);
    });
  });
});

describe(`금액 에러 테스트: `, () => {
  const lottoController = new LottoController();

  it(`금액이 숫자 타입이 아니면 에러를 던진다.`, () => {
    const moneyTypeTest = () => {
      lottoController.validateMoney("a thousand");
    };

    expect(moneyTypeTest).toThrow(MONEY_TYPE_ERROR_MESSAGE);
  });

  it(`금액이 ${LOTTO_TICKET_PRICE}원 이하면 에러를 던진다.`, () => {
    const moneyRangeTest = () => {
      lottoController.validateMoney("500");
    };

    expect(moneyRangeTest).toThrow(MONEY_RANGE_ERROR_MESSAGE);
  });

  it(`금액이 ${LOTTO_TICKET_PRICE}원 단위가 아니면 에러를 던진다.`, () => {
    const moneyUnitTest = () => {
      lottoController.validateMoney("2500");
    };

    expect(moneyUnitTest).toThrow(MONEY_UNIT_ERROR_MESSAGE);
  });
});

describe(`당첨 번호 에러 테스트: `, () => {
  const lottoController = new LottoController();

  it(`당첨 번호가 숫자 타입이 아니면 에러를 던진다.`, () => {
    const winNumTypeTest = () => {
      lottoController.validateWinningNumbers(["one", "two", "three", "four", "five", "six"]);
    };

    expect(winNumTypeTest).toThrow(NUMBER_TYPE_ERROR_MESSAGE);
  });

  it(`당첨 번호가 ${LOTTO_MIN_NUM} 이상 ${LOTTO_MAX_NUM} 이하 숫자가 아니면 에러를 던진다.`, () => {
    const winNumMinTest = () => {
      lottoController.validateWinningNumbers([0, 1, 2, 3, 4, 5]);
    };

    const winNumMaxTest = () => {
      lottoController.validateWinningNumbers([46, 47, 48, 49, 50, 51]);
    };

    expect(winNumMinTest).toThrow(NUMBER_RANGE_ERROR_MESSAGE);
    expect(winNumMaxTest).toThrow(NUMBER_RANGE_ERROR_MESSAGE);
  });

  it(`당첨 번호가 6개가 아니면 에러를 던진다.`, () => {
    const exceedTest = () => {
      lottoController.validateWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
    };

    const lackTest = () => {
      lottoController.validateWinningNumbers([1, 2, 3, 4]);
    };

    expect(exceedTest).toThrow(WINNING_NUMBERS_LENGTH_ERROR_MESSAGE);
    expect(lackTest).toThrow(WINNING_NUMBERS_LENGTH_ERROR_MESSAGE);
  });

  it(`당첨 번호가 중복되면 에러를 던진다.`, () => {
    const duplicateTest = () => {
      lottoController.validateWinningNumbers([1, 1, 2, 3, 4, 5]);
    };

    expect(duplicateTest).toThrow(DUPLICATE_WINNING_NUMBERS_ERROR_MESSAGE);
  });

  it(`보너스 번호가 당첨 번호와 중복되면 에러를 던진다.`, () => {
    const duplicateBonusTest = () => {
      lottoController.validateBonusNumber([1, 2, 3, 4, 5, 6], 1);
    };

    expect(duplicateBonusTest).toThrow(DUPLICATE_BONUS_NUMBER_ERROR_MESSAGE);
  });
});
