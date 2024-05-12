import {
  getAmount,
  getLottoNumberMatchCount,
  getWinningRank,
  hasBonusNumber,
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';

describe('로또 유틸 기능 테스트', () => {
  describe('번호는 1~45 사이의 숫자값이다.', () => {
    it.each([['1'], [0], [46], [Infinity], [-1], [''], ['  ']])(
      '%s 는 유효하지 않는 로또 번호입니다.',
      (lottoNumber) => {
        expect(isValidLottoNumber(lottoNumber)).toBeFalsy();
      }
    );
  });

  describe('유효한 로또 번호 테스트', () => {
    it.each([
      [[0, 0, 0, 0, 0, 0], '모든 번호가 0인 경우'],
      [[1, 1, 1, 1, 1, 1], '1부터 6까지 중복된 경우'],
      [[1, 2, 3, 4, 5], '번호가 6개가 아닌 경우'],
      [[7, 15, 21, 32, 44, 49], '유효한 번호 범위를 벗어난 경우'],
    ])('"%s" %s', (lottoNumber) => {
      expect(isValidLottoNumberArray(lottoNumber)).toBeFalsy();
    });
  });

  it('로또 번호에 보너스 번호가 포함되는지 확인한다.', () => {
    // given
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 4;

    // when
    const result = hasBonusNumber(lottoNumbers, bonusNumber);

    // then
    expect(result).toBeTruthy();
  });

  it('당첨 번호 수를 반환한다.', () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const lottoNumbers = [1, 2, 3, 10, 11, 12];

    // when
    const result = getLottoNumberMatchCount(winningNumbers, lottoNumbers);

    // then
    expect(result).toBeTruthy();
  });

  it('로또가 몇등인지 확인한다. 일치 개수와 보너스 일치 여부를 받는다.', () => {
    // given
    const matchCount = 5;
    const isBonusNumberMatch = true;

    // when
    const result = getWinningRank(matchCount, isBonusNumberMatch);

    // then
    expect(result).toBeTruthy();
  });

  it('예상되는 로또 당첨 금액을 확인한다.', () => {
    // given
    const matchCount = 5;
    const isBonusNumberMatch = true;
    const winningAmount = [
      2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
    ];

    // when
    const result = getAmount(matchCount, isBonusNumberMatch, winningAmount);

    // then
    expect(result).toBe(30_000_000);
  });

  describe('당첨 금액 조회', () => {
    it.each([
      [[1, 2, 3, 4, 5, 6], 2_000_000_000],
      [[1, 2, 3, 4, 5, 7], 30_000_000],
      [[1, 2, 3, 4, 5, 10], 1_500_000],
      [[1, 2, 3, 4, 10, 11], 50_000],
      [[1, 2, 3, 10, 11, 12], 5_000],
      [[1, 2, 10, 11, 12, 13], 0],
      [[10, 11, 12, 13, 14, 15], 0],
    ])('%s 의 당첨금액은 %s 입니다.', (lottoNumbers, expected) => {
      // given
      const winningAmount = [
        2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
      ];
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusWinningNumber = 7;

      const matchCount = getLottoNumberMatchCount(winningNumbers, lottoNumbers);

      const isBonusNumberMatch = hasBonusNumber(
        lottoNumbers,
        bonusWinningNumber
      );

      // when
      const result = getAmount(matchCount, isBonusNumberMatch, winningAmount);

      // then
      expect(result).toBe(expected);
    });
  });

  describe('당첨 등수 조회', () => {
    it.each([
      [[1, 2, 3, 4, 5, 6], 1],
      [[1, 2, 3, 4, 5, 7], 2],
      [[1, 2, 3, 4, 5, 10], 3],
      [[1, 2, 3, 4, 10, 11], 4],
      [[1, 2, 3, 10, 11, 12], 5],
      [[1, 2, 10, 11, 12, 13], -1],
      [[10, 11, 12, 13, 14, 15], -1],
    ])('%s는 %s등 입니다. (-1: 낙첨)', (lottoNumbers, expected) => {
      // given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusWinningNumber = 7;

      const matchCount = getLottoNumberMatchCount(winningNumbers, lottoNumbers);

      const isBonusNumberMatch = hasBonusNumber(
        lottoNumbers,
        bonusWinningNumber
      );

      // when
      const result = getWinningRank(matchCount, isBonusNumberMatch);

      // then
      expect(result).toBe(expected);
    });
  });
});
