import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../../../src/step1/constants/lotto';
import { Lotto } from '../../../src/step1/model';
import { isDefaultLottoCount, isValidLottoNumbersRange } from '../../../src/step1/utils/validate/lotto/lottoValidate';

describe('Lotto 관련 기능 테스트', () => {
  test.each([{ count: 5 }, { count: 4 }, { count: 3 }, { count: 1 }])(
    '랜덤 숫자들로 만들어진 로또는 총 $count개가 생성되어야 한다.',
    ({ count }) => {
      // given
      const lottos = Lotto.fromByRandomNumberMaker(count);
      // when
      const lottosLength = lottos.map((lotto) => lotto.getLottoNumbers()).length;
      // then
      expect(lottosLength).toEqual(count);
    },
  );

  test.each([{ count: 5 }, { count: 4 }, { count: 3 }, { count: 1 }])(
    `랜덤 숫자들로 만들어진 로또들은 모두 ${DEFAULT_LIMIT_LOTTO_COUNT}개의 로또 번호를 가지고 있다.`,
    ({ count }) => {
      // given
      const lottos = Lotto.fromByRandomNumberMaker(count);
      // when
      const hasSixLottoNumbers = lottos.every((lotto) => isDefaultLottoCount(lotto.getLottoNumbers()));
      // then
      expect(hasSixLottoNumbers).toBeTruthy();
    },
  );

  test.each([{ count: 5 }, { count: 4 }, { count: 3 }, { count: 1 }])(
    `랜덤 숫자들로 만들어진 로또들은 모두 ${MIN_LOTTO_NUMBER}에서 ${MAX_LOTTO_NUMBER}의 숫자 범위를 가지고 있다.`,
    ({ count }) => {
      // given
      const lottos = Lotto.fromByRandomNumberMaker(count);
      // when
      const isValidRange = lottos.every((lotto) => isValidLottoNumbersRange(lotto.getLottoNumbers()));
      // then
      expect(isValidRange).toBeTruthy();
    },
  );

  test.each([
    { lottoString: '1,22,33,4,43,12', seperator: ',' },
    { lottoString: '1.22.33.4.43.12', seperator: '.' },
    { lottoString: '1:22:33:4:43:12', seperator: ':' },
  ])('문자열로 만들어진 로또가 생성될 수 있다.', ({ lottoString, seperator }) => {
    const lotto = Lotto.fromByString(lottoString, seperator);
    const isLotto = lotto instanceof Lotto;
    expect(isLotto).toBeTruthy();
  });

  test.each([
    { lottoString: '1,22,33,4,43,12', seperator: ',' },
    { lottoString: '1.22.33.4.43.12', seperator: '.' },
    { lottoString: '1:22:33:4:43:12', seperator: ':' },
  ])(
    `문자열로 만들어진 로또는 총 ${DEFAULT_LIMIT_LOTTO_COUNT}개의 로또 번호를 갖는다.`,
    ({ lottoString, seperator }) => {
      const lotto = Lotto.fromByString(lottoString, seperator);
      const isValid = isDefaultLottoCount(lotto.getLottoNumbers());
      expect(isValid).toBeTruthy();
    },
  );

  test.each([
    { lottoString: '1,22,33,4,43,12', seperator: ',' },
    { lottoString: '1.22.33.4.43.12', seperator: '.' },
    { lottoString: '1:22:33:4:43:12', seperator: ':' },
  ])(
    `문자열로 만들어진 로또는 모두 ${MIN_LOTTO_NUMBER}에서 ${MAX_LOTTO_NUMBER}의 숫자 범위를 갖는다.`,
    ({ lottoString, seperator }) => {
      const lotto = Lotto.fromByString(lottoString, seperator);
      const isValid = isValidLottoNumbersRange(lotto.getLottoNumbers());
      expect(isValid).toBeTruthy();
    },
  );
});
