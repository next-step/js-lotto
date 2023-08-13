import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../../../src/step1/constants/lotto';
import LottoNumberMaker from '../../../src/step1/model/LottoNumberMaker';
import {
  isDuplicateLottoNumbers,
  isValidLottoNumbersRange,
} from '../../../src/step1/utils/validate/lotto/lottoValidate';

describe('LottoNumberMaker 기능 테스트', () => {
  test.each([{ startNumber: MIN_LOTTO_NUMBER, endNumber: MAX_LOTTO_NUMBER, count: DEFAULT_LIMIT_LOTTO_COUNT }])(
    'LottoNumberMaker가 생성한 로또는 6개의 로또 번호를 가진다.',
    ({ startNumber, endNumber, count }) => {
      // given
      const lottoNumberMaker = LottoNumberMaker.fromByLottoRangeInfo({ startNumber, endNumber, count });
      // when
      const lottoNumbers = lottoNumberMaker.createLottoNumbers();
      // then
      expect(lottoNumbers.length).toBe(DEFAULT_LIMIT_LOTTO_COUNT);
    },
  );

  test.each([{ startNumber: MIN_LOTTO_NUMBER, endNumber: MAX_LOTTO_NUMBER, count: DEFAULT_LIMIT_LOTTO_COUNT }])(
    `TestCase %#번에서 LottoNumberMaker가 생성한 로또는 ${MIN_LOTTO_NUMBER}에서 ${MAX_LOTTO_NUMBER}의 숫자 범위를 가진다.`,
    ({ startNumber, endNumber, count }) => {
      // given
      const lottoNumberMaker = LottoNumberMaker.fromByLottoRangeInfo({ startNumber, endNumber, count });
      // when
      const isValidRange = isValidLottoNumbersRange(lottoNumberMaker.createLottoNumbers());
      // then
      expect(isValidRange).toBeTruthy();
    },
  );

  test.each([{ startNumber: MIN_LOTTO_NUMBER, endNumber: MAX_LOTTO_NUMBER, count: DEFAULT_LIMIT_LOTTO_COUNT }])(
    `TestCase %#번에서 LottoNumberMaker가 생성한 로또 내 로또 번호들은 중복된 값을 가지지 않는다.`,
    ({ startNumber, endNumber, count }) => {
      // given
      const lottoNumberMaker = LottoNumberMaker.fromByLottoRangeInfo({ startNumber, endNumber, count });
      // when
      const isDuplicate = isDuplicateLottoNumbers(lottoNumberMaker.createLottoNumbers());
      // then
      expect(isDuplicate).toBeFalsy();
    },
  );
});
