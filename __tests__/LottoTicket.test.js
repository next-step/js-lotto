import LottoTicket from '../src/js/domain/LottoTicket';
import Product from '../src/js/domain/Product';
import { generateLottoNumberArray } from '../src/js/utils/LottoUtil';

const context = describe;

describe('LottoTicket 기능 테스트', () => {
  context('LottoTicket 인스턴스를 생성할 때', () => {
    it('Product를 상속받는지 확인한다.', () => {
      expect(new LottoTicket(generateLottoNumberArray())).toBeInstanceOf(
        Product
      );
    });
  });
});

describe('LottoTicket 번호 테스트', () => {
  context('로또 번호로 %s가 주어질 때', (lottoNumbers) => {
    it('배열이 아닐 경우 Throw 한다.', () => {
      expect(() => new LottoTicket(lottoNumbers)).toThrow();
    });
  });

  context('랜덤한 6개의 로또 번호가 주어질 때', () => {
    it('길이가 6인지 확인한다.', () => {
      // given
      const lottoTicket = new LottoTicket(generateLottoNumberArray());

      // then
      expect(lottoTicket.lottoNumbers).toHaveLength(6);
    });
  });

  context('중복된 로또 번호가 주어질때 ', () => {
    it('TypeError를 Throw 한다..', () => {
      expect(() => {
        new LottoTicket([1, 1, 2, 10, 30, 40]);
      }).toThrow();
    });
  });
});

describe('LottoTicket 금액 테스트', () => {
  context('LottoTicket를 생성할 때', () => {
    it('기본 금액은 1,000원 이다.', () => {
      // given
      const lottoTicket = new LottoTicket(generateLottoNumberArray());

      // when
      const price = lottoTicket.price;

      // then
      expect(price).toBe(1_000);
    });
  });
});
