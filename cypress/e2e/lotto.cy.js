import { LOTTO_LENGTH, LOTTO_NUMBER } from '../../src/js/service/Constant';
import { generateLottoNumbers } from '../../src/js/service/lottoShop';

describe('로또 난수 생성 로직을 점검한다', () => {
  it('로또 난수가 최소~최대 범위에 맞게 잘 생성되는지 검사한다', () => {
    const lottoNumbers = generateLottoNumbers();

    cy.wrap(lottoNumbers).each((number) => {
      expect(number).to.gte(LOTTO_NUMBER.MIN);
      expect(number).to.lte(LOTTO_NUMBER.MAX);
    });
  });

  it('로또가 6자리 생성되는지 검사한다', () => {
    const lottoNumbers = generateLottoNumbers();

    expect(lottoNumbers.length).to.eq(LOTTO_LENGTH);
  });

  it('로또 난수가 중복없이 생성되는지 검사한다', () => {
    const lottoNumbers = generateLottoNumbers();
    const deduplicatedLottoNumbers = Array.from(new Set(lottoNumbers));
    expect(deduplicatedLottoNumbers.length).to.eq(LOTTO_LENGTH);
  });
});
