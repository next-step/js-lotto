import { LottoMerchant } from '@step1/model';

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
});
