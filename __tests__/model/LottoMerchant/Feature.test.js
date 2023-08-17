import { LOTTO_TERMS } from '../../../src/step1/constants/lotto';
import { LottoMerchant } from '../../../src/step1/model';
import { isValidLottoNumbersRange } from '../../../src/step1/utils/validate/lotto/lottoValidate';

describe('LottoMerchant 관련 기능 테스트', () => {
  test.each([
    { investmentAmount: 3000, lottosLength: 3 },
    { investmentAmount: 4000, lottosLength: 4 },
    { investmentAmount: 6000, lottosLength: 6 },
    { investmentAmount: 2000, lottosLength: 2 },
    { investmentAmount: 8000, lottosLength: 8 },
  ])('$investmentAmount원치의 로또는 총 $lottosLength개가 생성되어야 한다.', ({ investmentAmount, lottosLength }) => {
    // given
    const lottoMerchant = LottoMerchant.from(investmentAmount);
    // when
    const expectLottoLength = lottoMerchant.sellLotto().length;
    // then
    expect(expectLottoLength).toEqual(lottosLength);
  });

  test.each([
    { investmentAmount: 3000, lottosLength: 3 },
    { investmentAmount: 4000, lottosLength: 4 },
    { investmentAmount: 6000, lottosLength: 6 },
    { investmentAmount: 2000, lottosLength: 2 },
    { investmentAmount: 8000, lottosLength: 8 },
  ])(
    `$lottosLength개의 로또 번호는 모두 ${LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT}개여야 한다.`,
    ({ investmentAmount }) => {
      // given
      const lottoMerchant = LottoMerchant.from(investmentAmount);
      // when
      const lottos = lottoMerchant.sellLotto();
      const hasSixNumbersInLotto = lottos.every(
        (lotto) => lotto.getLottoNumbers().length === LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT,
      );
      // then
      expect(hasSixNumbersInLotto).toBeTruthy();
    },
  );

  test.each([
    { investmentAmount: 3000, lottosLength: 3 },
    { investmentAmount: 4000, lottosLength: 4 },
    { investmentAmount: 6000, lottosLength: 6 },
    { investmentAmount: 2000, lottosLength: 2 },
    { investmentAmount: 8000, lottosLength: 8 },
  ])(
    `$lottosLength개의 로또 번호는 모두 ${LOTTO_TERMS.MIN_LOTTO_NUMBER} ~ ${LOTTO_TERMS.MAX_LOTTO_NUMBER}의 범위를 가진다.`,
    ({ investmentAmount }) => {
      // given
      const lottoMerchant = LottoMerchant.from(investmentAmount);
      // when
      const isValidLottoNumbers = lottoMerchant
        .sellLotto()
        .every((lotto) => isValidLottoNumbersRange(lotto.getLottoNumbers()));
      // then
      expect(isValidLottoNumbers).toBeTruthy();
    },
  );
});
