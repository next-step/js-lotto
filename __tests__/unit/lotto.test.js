import {
  LOTTO_AMOUNT_UNIT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
} from '../../src/constants/lotto.const.js';
import Lotto from '../../src/lotto/lotto.js';
import { getSortedArray } from '../../src/utils/sort.util.js';

const lotto = new Lotto();

describe('로또 구입', () => {
  // 로또 구입 금액 입력 시 숫자로만 입력이 가능하다.
  test('Purchase Amount input 4000 -> true', () => {
    expect(lotto.validatePurchaseAmount(4000)).toBe(true);
  });
  test('Purchase Amount input "wrong input" -> false', () => {
    expect(lotto.validatePurchaseAmount('wrong input')).toBe(false);
  });

  // 로또 구입 금액 입력 시 1,000 단위이다.
  test('Purchase Amount input 3000 -> true', () => {
    expect(lotto.validatePurchaseAmount(3000)).toBe(true);
  });
  test('Purchase Amount input 1234 -> false', () => {
    expect(lotto.validatePurchaseAmount(1234)).toBe(false);
  });

  // 로또 구입 금액에 해당하는 만큼의 로또 발행
  test('(purchaseAmount / 1000) -> Purchased Lotto Counts', () => {
    const purchaseAmount = 5000;

    lotto.setPurchasedLottoCounts(purchaseAmount);

    expect(lotto.getPurchasedLottoCounts()).toBe(
      purchaseAmount / LOTTO_AMOUNT_UNIT
    );
  });
  test('PurchasedLottoCounts -> the number of myLottos length', () => {
    const purchaseAmount = 5000;

    lotto.setPurchasedLottoCounts(purchaseAmount);
    lotto.setMyLottos(lotto.getPurchasedLottoCounts());

    expect(lotto.getMyLottos().length).toBe(purchaseAmount / LOTTO_AMOUNT_UNIT);
  });

  // 내가 발행받은 로또 번호의 숫자 범위는 1~45 사이이다.
  test.each(lotto.createLottoNumbers(5))(
    'My Lotto Numbers -> 1~45',
    (num1, num2, num3, num4, num5, num6) => {
      expect(num1).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num1).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);

      expect(num2).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num2).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);

      expect(num3).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num3).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);

      expect(num4).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num4).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);

      expect(num5).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num5).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);

      expect(num6).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(num6).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);
    }
  );

  // 내가 발행받은 로또 번호는 총 6개이다.
  test('My Lotto Numbers -> 6 counts', () => {
    const purchaseAmount = 1000;

    lotto.setPurchasedLottoCounts(purchaseAmount);
    lotto.setMyLottos(lotto.getPurchasedLottoCounts());

    expect(lotto.getMyLottos()[0].length).toBe(LOTTO_NUMBER_COUNT);
  });

  // 내가 발행받은 로또 번호는 중복이 발생하지 않는다.
  test('My Lotto Numbers -> Not Duplicated', () => {
    const purchaseAmount = 1000;

    lotto.setPurchasedLottoCounts(purchaseAmount);
    lotto.setMyLottos(lotto.getPurchasedLottoCounts());

    expect(
      lotto.getMyLottos().length === new Set(lotto.getMyLottos()).size
    ).toBe(true);
  });
});

describe('로또 당첨 번호/보너스 번호', () => {
  // 공백이 아니다.
  test('lotto answer blank -> false', () => {
    const lottoAnswer = '';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(false);
  });

  // ,를 구분자로 모든 값은 숫자이다.
  test('lotto answer include string -> false', () => {
    const lottoAnswer = '1,2,3,4,5,A';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(false);
  });
  test('lotto answer all number -> true', () => {
    const lottoAnswer = '1,2,3,4,5,6';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(true);
  });

  // 당첨 번호의 숫자 범위는 1~45 사이이다.
  test('lotto answer over 45 -> false', () => {
    const lottoAnswer = '1,2,3,4,5,48';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(false);
  });

  // 당첨 번호는 총 6개이다.
  test('lotto answer counts over 6 -> false', () => {
    const lottoAnswer = '1,2,3,4,5,6,7';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(false);
  });
  test('lotto answer counts 6 -> true', () => {
    const lottoAnswer = '1,2,3,4,5,6';

    expect(lotto.validateLottoAnswer(lottoAnswer)).toBe(true);
  });

  // 당첨 번호는 중복이 발생하지 않는다.
  test('lotto answer counts 6 -> true', () => {
    const lottoAnswer = '1,2,3,4,5,6';
    const lottoBonus = '6';

    lotto.setLottoAnswer(lottoAnswer);

    expect(lotto.validateLottoBonus(lottoBonus)).toBe(false);
  });
  test('lotto answer counts 6 -> true', () => {
    const lottoAnswer = '1,2,3,4,5,6';
    const lottoBonus = 7;

    lotto.setLottoAnswer(lottoAnswer);

    expect(lotto.validateLottoBonus(lottoBonus)).toBe(true);
  });
});

describe('당첨 통계 및 수익률', () => {
  test('print statistics spy', () => {
    const spyFn = jest.spyOn(lotto, 'printWinStatistics');

    const purchasedLottoCounts = 5;

    const statistics = {
      'first place': 0,
      'second place': 1,
      'third place': 1,
      'fourth place': 0,
      'fifth place': 0,
      'no luck': 3,
    };

    lotto.printWinStatistics(statistics, purchasedLottoCounts);

    expect(spyFn).toBeCalledTimes(1);
    expect(spyFn).toBeCalledWith(statistics, purchasedLottoCounts);
  });

  // 1등 당첨
  test('calculate lotto rank 1 -> true', () => {
    lotto.setStatistics(
      [
        [1, 2, 3, 4, 5, 6],
        [10, 11, 12, 13, 14, 7],
      ],
      [1, 2, 3, 4, 5, 6],
      7
    );
    expect(lotto.getStatistics()['first place']).toBe(1);
  });

  // 2등 당첨
  test('calculate lotto rank 2 -> true', () => {
    lotto.setStatistics(
      [
        [1, 2, 3, 4, 5, 6],
        [10, 11, 12, 13, 14, 7],
      ],
      [10, 11, 12, 13, 14, 42],
      7
    );
    expect(lotto.getStatistics()['second place']).toBe(1);
  });

  // 3등 당첨
  test('calculate lotto rank 3 -> true', () => {
    lotto.setStatistics(
      [
        [1, 2, 3, 4, 5, 6],
        [10, 11, 12, 13, 14, 32],
      ],
      [10, 11, 12, 13, 14, 42],
      7
    );
    expect(lotto.getStatistics()['third place']).toBe(1);
  });

  // 4등 당첨
  test('calculate lotto rank 4 -> true', () => {
    lotto.setStatistics(
      [
        [1, 2, 3, 4, 5, 6],
        [10, 11, 12, 13, 41, 7],
      ],
      [10, 11, 12, 13, 14, 42],
      7
    );
    expect(lotto.getStatistics()['fourth place']).toBe(1);
  });

  // 5등 당첨
  test('calculate lotto rank 5 -> true', () => {
    lotto.setStatistics(
      [
        [1, 2, 3, 4, 5, 6],
        [10, 11, 12, 30, 31, 32],
      ],
      [10, 11, 12, 13, 14, 42],
      7
    );
    expect(lotto.getStatistics()['fifth place']).toBe(1);
  });
});

describe('Step 2 - 재시작 기능 및 UX 개선', () => {
  // 로또 번호는 오름차순으로 정렬하여 보여준다.
  test('my lotto numbers sorted ASC -> true', () => {
    lotto.setMyLottos(3);
    lotto.getMyLottos().forEach((myLotto) => {
      expect(
        JSON.stringify(getSortedArray(myLotto, { isAscending: true })) ===
          JSON.stringify(myLotto)
      ).toBe(true);
    });
  });

  // 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.
  // 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.

  // 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.
});
