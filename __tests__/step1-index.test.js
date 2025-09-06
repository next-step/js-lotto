import { buyNumbers } from '../src/domain/purchase.js';
import { PurchasedNumbers } from '../src/views/PurchasedNumbers.js';
import {
  isValidWinningNumbers,
  isValidBonusNumber,
} from '../src/domain/winnings.js';

describe('로또 구입', () => {
  test('로또 구입 금액 5000원을 입력하면, 로또 5개를 살 수 있다.', async () => {
    const AMOUNT_PAID = 5000;

    const result = buyNumbers(AMOUNT_PAID);

    expect(result).toBe(5);
  });

  test('로또 구입 금액 900원을 입력하면, 로또를 살 수 없다는 에러가 뜬다.', async () => {
    const AMOUNT_PAID = 900;

    expect(() => buyNumbers(AMOUNT_PAID)).toThrow(
      '로또는 1,000원 이상부터 구매 가능합니다.',
    );
  });
});

describe('번호 입력', () => {
  test('당첨 번호 1,2,3,4,5 를 입력하면, 번호 개수 에러가 뜬다.', async () => {
    const WINNING_NUMBERS = '1,2,3,4,5';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '숫자를 6개 입력해주세요.',
    );
  });

  test('당첨 번호 1,2,3,4,5,6, 을 입력하면 공백은 숫자는 제거되어 입력할 수 있다.', async () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6,';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS));
  });

  test('당첨 번호 1,1,2,3,4,5 를 입력하면 숫자 중복 에러가 뜬다.', async () => {
    const WINNING_NUMBERS = '1,1,2,3,4,5';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '중복되는 숫자는 입력할 수 없습니다.',
    );
  });

  test('당첨 번호 1,2,3,4,5,46을 입력하면 숫자 범위 에러가 뜬다.', async () => {
    const WINNING_NUMBERS = '1,2,3,4,5,46';

    expect(() => isValidWinningNumbers(WINNING_NUMBERS)).toThrow(
      '1~45 사이의 숫자만 입력 가능합니다.',
    );
  });

  test('보너스 번호 50을 입력하면 숫자 범위 에러가 뜬다.', async () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 50;

    expect(() => isValidBonusNumber(BONUS_NUMBERS, WINNING_NUMBERS)).toThrow(
      '1~45 사이의 숫자만 입력 가능합니다.',
    );
  });

  test('당첨 번호 1,2,3,4,5,6와 보너스번호 5를 입력하면 중복 에러가 뜬다.', async () => {
    const WINNING_NUMBERS = '1,2,3,4,5,6';
    const BONUS_NUMBERS = 5;

    expect(() => isValidBonusNumber(BONUS_NUMBERS, WINNING_NUMBERS)).toThrow(
      '당첨 번호와 중복되지 않게 입력해주세요.',
    );
  });
});
