import LottoMachine from '../src/js/domain/LottoMachine';
import {
  generateLottoNumberArray,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';
import LottoTicket from '../src/js/domain/LottoTicket';

describe('로또 머신 기능 테스트', () => {
  it('로또 머신은 당첨번호, 보너스번호를 가진다.', () => {
    const lottoMachine = new LottoMachine();

    expect(lottoMachine).toHaveProperty('winningNumbers');
    expect(lottoMachine).toHaveProperty('bonusWinningNumber');
  });
  describe('당첨 번호 설정', () => {
    it('당첨 번호를 설정할 수 있다.', () => {
      // given
      const lottoMachine = new LottoMachine();

      // when
      lottoMachine.winningNumbers = generateLottoNumberArray();

      // then
      expect(isValidLottoNumberArray(lottoMachine.winningNumbers)).toBeTruthy();
    });
    it('보너스 번호를 설정할 수 있다.', () => {
      // given
      const lottoMachine = new LottoMachine();
      lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];

      // when
      lottoMachine.bonusWinningNumber = 7;

      // then
      expect(lottoMachine.bonusWinningNumber).toBe(7);
      expect(() => (lottoMachine.bonusWinningNumber = 0)).toThrow();
      expect(() => (lottoMachine.bonusWinningNumber = 6)).toThrow();
    });
  });
  it('당첨 번호 설정', () => {
    // given
    const lottoMachine = new LottoMachine();

    // when
    lottoMachine.winningNumbers = generateLottoNumberArray();

    // then
    expect(isValidLottoNumberArray(lottoMachine.winningNumbers)).toBeTruthy();
    expect(() => {
      lottoMachine.winningNumbers = [0, 0, 0, 45, 45, 46];
    }).toThrow();
  });
  it.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 10], 3],
    [[1, 2, 3, 4, 10, 11], 4],
    [[1, 2, 3, 10, 11, 12], 5],
    [[1, 2, 10, 11, 12, 13], -1],
    [[10, 11, 12, 13, 14, 15], -1],
  ])('당첨 등수 조회', (lottoNumbers, expected) => {
    // given
    const lottoMachine = new LottoMachine();
    lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];
    lottoMachine.bonusWinningNumber = 7;

    const lottoTicket = new LottoTicket();
    lottoTicket.lottoNumbers = lottoNumbers;

    // when
    const result = lottoMachine.getWinningRank(lottoTicket.lottoNumbers);

    // then
    expect(result).toBe(expected);
  });
  it.each([[[]], [[1, 2, 3, 4, 5]]])('당첨 금액 설정', (winningAmount) => {
    expect(() => new LottoMachine(winningAmount)).toThrow();
  });
  it.each([
    [[1, 2, 3, 4, 5, 6], 2_000_000_000],
    [[1, 2, 3, 4, 5, 7], 30_000_000],
    [[1, 2, 3, 4, 5, 10], 1_500_000],
    [[1, 2, 3, 4, 10, 11], 50_000],
    [[1, 2, 3, 10, 11, 12], 5_000],
    [[1, 2, 10, 11, 12, 13], 0],
    [[10, 11, 12, 13, 14, 15], 0],
  ])('당첨 금액 조회', (lottoNumbers, expected) => {
    // given
    const lottoMachine = new LottoMachine([
      2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
    ]);
    lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];
    lottoMachine.bonusWinningNumber = 7;

    const lottoTicket = new LottoTicket();
    lottoTicket.lottoNumbers = lottoNumbers;

    // when
    const result = lottoMachine.getAmount(lottoTicket.lottoNumbers);

    // then
    expect(result).toBe(expected);
  });
});
