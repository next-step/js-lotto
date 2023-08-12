import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../../src/step1/constants/lotto';
import LottoNumberMaker from '../../src/step1/utils/LottoMaker';
import { isDuplicateLottoNumbers, isValidLottoNumbersRange } from '../../src/step1/utils/validate/lotto/lottoValidate';

describe('LottoNumberMaker 모듈 테스트', () => {
  test('LottoNumberMaker가 생성한 로또는 6개의 로또 번호를 가진다.', async () => {
    // given - when
    const lottoNumbers = LottoNumberMaker.createNumbers();
    // then
    expect(lottoNumbers.length).toBe(DEFAULT_LIMIT_LOTTO_COUNT);
  });

  test.each(Array(10).fill([]))(
    `TestCase %#번에서 LottoNumberMaker가 생성한 로또는 ${MIN_LOTTO_NUMBER}에서 ${MAX_LOTTO_NUMBER}의 숫자 범위를 가진다.`,
    () => {
      // given
      const lottoNumbers = LottoNumberMaker.createNumbers();
      // when
      const isValidRange = isValidLottoNumbersRange(lottoNumbers);
      // then
      expect(isValidRange).toBeTruthy();
    },
  );

  test.each(Array(10).fill([]))(
    `TestCase %#번에서 LottoNumberMaker가 생성한 로또 내 로또 번호들은 중복된 값을 가지지 않는다.`,
    () => {
      // given
      const lottoNumbers = LottoNumberMaker.createNumbers();
      // when
      const isDuplicate = isDuplicateLottoNumbers(lottoNumbers);
      // then
      expect(isDuplicate).toBeFalsy();
    },
  );
});
