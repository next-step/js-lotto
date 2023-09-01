import { SYMBOLS } from '@step1/constants/commons';
import { LOTTO_TERMS } from '@step1/constants/lotto';
import { Lotto } from '@step1/model';
import { isDefaultLottoCount, isValidLottoNumbersRange } from '@step1/utils/validate/lotto/lottoValidate';
import { describe, expect, test } from '@jest/globals';

describe('Lotto 관련 기능 테스트', () => {
  describe('랜덤 번호를 통한 로또 생성 테스트', () => {
    test.each([{ count: 5 }, { count: 1 }])(
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

    test.each([{ count: 5 }])(
      `랜덤 숫자들로 만들어진 로또들은 모두 ${LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT}개의 로또 번호를 가지고 있다.`,
      ({ count }) => {
        // given
        const lottos = Lotto.fromByRandomNumberMaker(count);
        // when
        const hasSixLottoNumbers = lottos.every((lotto) => isDefaultLottoCount(lotto.getLottoNumbers()));
        // then
        expect(hasSixLottoNumbers).toBeTruthy();
      },
    );

    test.each([{ count: 5 }])(
      `랜덤 숫자들로 만들어진 로또들은 모두 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}에서 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}의 숫자 범위를 가지고 있다.`,
      ({ count }) => {
        // given
        const lottos = Lotto.fromByRandomNumberMaker(count);
        // when
        const isValidRange = lottos.every((lotto) => isValidLottoNumbersRange(lotto.getLottoNumbers()));
        // then
        expect(isValidRange).toBeTruthy();
      },
    );
  });

  describe('문자열을 통한 로또 생성 테스트', () => {
    test.each([
      { lottoString: '1,22,33,4,43,12', separator: SYMBOLS.COMMA },
      { lottoString: '1.22.33.4.43.12', separator: SYMBOLS.DOT },
      { lottoString: '1:22:33:4:43:12', separator: SYMBOLS.COLON },
    ])('$separator인 구분자가 있는 문자열을 통해 로또가 생성될 수 있다.', ({ lottoString, separator }) => {
      const lotto = Lotto.fromByString(lottoString, separator);
      const isLotto = lotto instanceof Lotto;
      expect(isLotto).toBeTruthy();
    });

    test.each([
      { lottoString: '1,22,33,4,43,12', separator: SYMBOLS.COMMA },
      { lottoString: '1.22.33.4.43.12', separator: SYMBOLS.DOT },
      { lottoString: '1:22:33:4:43:12', separator: SYMBOLS.COLON },
    ])(
      `$separator인 구분자가 있는 문자열로 만들어진 로또는 총 ${LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT}개의 로또 번호를 갖는다.`,
      ({ lottoString, separator }) => {
        const lotto = Lotto.fromByString(lottoString, separator);
        const isValid = isDefaultLottoCount(lotto.getLottoNumbers());
        expect(isValid).toBeTruthy();
      },
    );

    test.each([
      { lottoString: '1,22,33,4,43,12', separator: SYMBOLS.COMMA },
      { lottoString: '1.22.33.4.43.12', separator: SYMBOLS.DOT },
      { lottoString: '1:22:33:4:43:12', separator: SYMBOLS.COLON },
    ])(
      `$separator인 구분자가 있는 문자열로 만들어진 로또는 모두 ${LOTTO_TERMS.MIN_LOTTO_NUMBER}에서 ${LOTTO_TERMS.MAX_LOTTO_NUMBER}의 숫자 범위를 갖는다.`,
      ({ lottoString, separator }) => {
        const lotto = Lotto.fromByString(lottoString, separator);
        const isValid = isValidLottoNumbersRange(lotto.getLottoNumbers());
        expect(isValid).toBeTruthy();
      },
    );
  });
});
