import { getRandomIntInRange } from '../../../src/utils';

/**
 * 주어진 범위 내의 난수를 생성한다.
 * 로또 class 내부의 번호를 결정하는 private method에 사용된다.
 *
 * getRandomIntInRange가 잘못된 값을 반환할 확률이 p일 경우 (1 - p)^TEST_COUTNS의 확률로 문제를 잡아낸다.
 * p = 0.01(1%)이고 TEST_COUNTS가 10000일 경우 테스트의 정확도는 99.99546%이다.
 *
 * 해당 테스트코드는 테스트가 필요한 경우에만, skip을 only로 변경하여 테스트를 진행한다.
 */

describe.skip('난수 생성 함수', () => {
  const MIN = 1;
  const MAX = 10;
  const TEST_COUNTS = 10_000;

  test('정해진 범위 내의 숫자를 생성한다.', () => {
    for (let i = 0; i < TEST_COUNTS; i++) {
      const randomNumber = getRandomIntInRange(MIN, MAX);
      expect(randomNumber).toBeGreaterThanOrEqual(MIN);
      expect(randomNumber).toBeLessThanOrEqual(MAX);
    }
  });
});
