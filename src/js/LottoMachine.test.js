import LottoMachine from './LottoMachine.js';

describe('LottoMachine', () => {
  describe('로또 번호 생성', () => {
    it('각 로또 번호는 45 이하의 자연수이다.', () => {
      const lottoMachine = new LottoMachine();

      const lottoNumbers = lottoMachine.generateLottoNumbers();

      lottoNumbers.forEach(number => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });

    it('생성된 로또 번호는 중복되지않는다.', () => {
      const lottoMachine = new LottoMachine();

      const lottoNumbers = lottoMachine.generateLottoNumbers();

      expect(lottoNumbers.length).toBe([...new Set(lottoNumbers)].length);
    });

    it('생성된 로또 번호는 총 7개이다', () => {
      const lottoMachine = new LottoMachine();

      const lottoNumbers = lottoMachine.generateLottoNumbers();

      expect(lottoNumbers.length).toBe(7);
    });
  });
});
