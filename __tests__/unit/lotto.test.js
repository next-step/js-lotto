import {
  LOTTO_AMOUNT_UNIT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
} from '../../src/constants/lotto.const.js';
import Lotto from '../../src/lotto/lotto.js';

const lotto = new Lotto();

describe('로또 구입', () => {
  // 로또 구입 금액 입력 시 숫자로만 입력이 가능하고 1,000 단위이다.
  test('Purchase Amount input 3000 -> true', () => {
    expect(lotto.validatePurchaseAmount(3000)).toBe(true);
  });

  test('Purchase Amount input "wrong input" -> false', () => {
    expect(lotto.validatePurchaseAmount('wrong input')).toBe(false);
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
    lotto.setMyLottos(
      lotto.createLottoNumbers(lotto.getPurchasedLottoCounts())
    );

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
    lotto.setMyLottos(
      lotto.createLottoNumbers(lotto.getPurchasedLottoCounts())
    );

    expect(lotto.getMyLottos()[0].length).toBe(LOTTO_NUMBER_COUNT);
  });

  // 내가 발행받은 로또 번호는 중복이 발생하지 않는다.
  test('My Lotto Numbers -> Not Duplicated', () => {
    const purchaseAmount = 1000;

    lotto.setPurchasedLottoCounts(purchaseAmount);
    lotto.setMyLottos(
      lotto.createLottoNumbers(lotto.getPurchasedLottoCounts())
    );

    expect(
      lotto.getMyLottos().length === new Set(lotto.getMyLottos()).size
    ).toBe(true);
  });
});

describe('로또 당첨 번호/보너스 번호', () => {
  // 당첨 번호와 보너스 번호 입력
  // 당첨 번호의 숫자 범위는 1~45 사이이다.
  // 당첨 번호는 총 6개이다.
  // 당첨 번호는 중복이 발생하지 않는다.
  // 보너스 번호는 1~45 사이 숫자 중 당첨 번호와 다른 번호이다.
});

describe('당첨 통계 및 수익률', () => {
  // 사용자가 구매한 로또 번호와 당첨 번호 비교
  // 당첨 내역 출력
  //  - 1등: 6개 번호 일치 / 2,000,000,000원
  //  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  //  - 3등: 5개 번호 일치 / 1,500,000원
  //  - 4등: 4개 번호 일치 / 50,000원
  //  - 5등: 3개 번호 일치 / 5,000원
  // 수익률 출력
});
