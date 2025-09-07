import { buyNumbers } from '../src/domain/amountPaid.js';
import {
  isValidWinningNumbers,
  isValidBonusNumber,
} from '../src/domain/lottoNumbers.js';
import {
  matchWithLottoNumbers,
  createRankCountsMap,
} from '../src/domain/winningsStatistics.js';
import { calculateWinningsRate } from '../src/domain/winningsRate.js';

describe('로또 구입', () => {
  test('로또 구입 금액 5000원을 입력하면, 로또 5개를 살 수 있다.', () => {
    const AMOUNT_PAID = 5000;

    const result = buyNumbers(AMOUNT_PAID);

    expect(result).toBe(5);
  });

  test('로또 구입 금액 900원을 입력하면, 로또를 살 수 없다는 에러가 뜬다.', () => {
    const AMOUNT_PAID = 900;

    expect(() => buyNumbers(AMOUNT_PAID)).toThrow(
      '로또는 1,000원 이상부터 구매 가능합니다.',
    );
  });
});

describe('로또 번호 입력', () => {
  test('당첨 번호 1,2,3,4,5 를 입력하면, 번호 개수 에러가 뜬다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '숫자를 6개 입력해주세요.',
    );
  });

  test('당첨 번호 1,2,3,4,5,6, 을 입력하면 공백은 숫자는 제거되어 입력할 수 있다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6,';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS));
  });

  test('당첨 번호 1,1,2,3,4,5 를 입력하면 숫자 중복 에러가 뜬다.', () => {
    const WINNING_NUMBERS = '1,1,2,3,4,5';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '중복되는 숫자는 입력할 수 없습니다.',
    );
  });

  test('당첨 번호 1,2,3,4,5,46을 입력하면 숫자 범위 에러가 뜬다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,46';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '1~45 사이의 숫자만 입력 가능합니다.',
    );
  });

  test('보너스 번호 50을 입력하면 숫자 범위 에러가 뜬다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 50;

    expect(() => isValidBonusNumber(BONUS_NUMBERS, WINNING_NUMBERS)).toThrow(
      '1~45 사이의 숫자만 입력 가능합니다.',
    );
  });

  test('당첨 번호 1,2,3,4,5,6와 보너스번호 5를 입력하면 중복 에러가 뜬다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 5;

    expect(() => isValidBonusNumber(BONUS_NUMBERS, WINNING_NUMBERS)).toThrow(
      '당첨 번호와 중복되지 않게 입력해주세요.',
    );
  });
});

describe('로또 라인별 등수', () => {
  test('당첨 번호 1,2,3,4,5,6이고 보너스 번호 7일때, 구매번호가 1,2,3,7,8,9 이면 fifth 등수가 된다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 7;
    const PURCHASED_LINE = [1, 2, 3, 7, 8, 9];

    const result = matchWithLottoNumbers(PURCHASED_LINE, {
      winningNumbers: WINNING_NUMBERS,
      bonusNumber: BONUS_NUMBERS,
    });

    expect(result).toBe('fifth');
  });

  test('당첨 번호 1,2,3,4,5,6이고 보너스 번호 7일때, 구매번호가 1,2,3,4,5,8 이면 third 등수가 된다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 7;
    const PURCHASED_LINE = [1, 2, 3, 4, 5, 8];

    const result = matchWithLottoNumbers(PURCHASED_LINE, {
      winningNumbers: WINNING_NUMBERS,
      bonusNumber: BONUS_NUMBERS,
    });

    expect(result).toBe('third');
  });

  test('당첨 번호 1,2,3,4,5,6이고 보너스 번호 7일때, 구매번호가 1,2,3,4,5,7 이면 second 등수가 된다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 7;
    const PURCHASED_LINE = [1, 2, 3, 4, 5, 7];

    const result = matchWithLottoNumbers(PURCHASED_LINE, {
      winningNumbers: WINNING_NUMBERS,
      bonusNumber: BONUS_NUMBERS,
    });

    expect(result).toBe('second');
  });
});

describe('당첨 통계', () => {
  test('당첨 번호 1,2,3,4,5,6이고 보너스 번호 7일때, 구매번호가 1,2,3,7,8,9 이면 5등 1개가 당첨 된다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 7;
    const PURCHASED_Numbers = [[1, 2, 3, 7, 8, 9]];

    const rankCountsMap = createRankCountsMap(PURCHASED_Numbers, {
      winningNumbers: WINNING_NUMBERS,
      bonusNumber: BONUS_NUMBERS,
    });

    const result = rankCountsMap['fifth'];

    expect(result).toBe(1);
  });

  test('당첨 번호 1,2,3,4,5,6이고 보너스 번호 7일때, 구매번호가 1,2,3,7,8,9와 1,2,3,7,8,9 이면 5등 2개가 당첨 된다.', () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 7;
    const PURCHASED_Numbers = [
      [1, 2, 3, 7, 8, 9],
      [1, 2, 3, 7, 8, 9],
    ];

    const rankCountsMap = createRankCountsMap(PURCHASED_Numbers, {
      winningNumbers: WINNING_NUMBERS,
      bonusNumber: BONUS_NUMBERS,
    });

    const result = rankCountsMap['fifth'];

    expect(result).toBe(2);
  });
});

describe('수익률', () => {
  test('구입금액이 8000원이고 5등에 1개 당첨됐을 때, 수익률은 62.5%이다.', () => {
    const AMOUNT_PAID = 8000;
    const RANK_COUNTS_MAP = {
      fifth: 1,
      fourth: 0,
      third: 0,
      second: 0,
      first: 0,
    };

    const result = calculateWinningsRate(AMOUNT_PAID, RANK_COUNTS_MAP);

    expect(result).toBe(62.5);
  });
});
