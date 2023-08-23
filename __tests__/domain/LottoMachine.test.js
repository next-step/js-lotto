import { LottoMachine } from '../../src/js/domain/index.js';

// const isAscending = (arr) => arr.every((item, idx) => (idx === 0 ? true : item >= arr[idx - 1]));

// describe('오름차순 확인 테스트', () => {
//   it.each([
//     [1, 2, 3, 4, 5, 6],
//     [11, 24, 24, 24, 25],
//     [-3, -1, 0, 2],
//   ])('배열이 오름차순일시 true를 반환한다', (...arr) => {
//     expect(isAscending([...arr])).toBeTruthy();
//   });
//   it.each([
//     [1, 2, 3, 4, 5, 4],
//     [11, 24, 24, 24, -1],
//     [-3, -1, 0, -1],
//   ])('배열이 오름차순 아닐시 false를 반환한다', (...arr) => {
//     expect(isAscending([...arr])).toBeFalsy();
//   });
// });

describe('로또 머신 테스트', () => {
  it.each([
    { money: 1_000, sheets: 1 },
    { money: 10_000, sheets: 10 },
    { money: 30_000, sheets: 30 },
  ])('$money원을 입력하면 장당 가격에 비례한 $sheets장의 로또를 발급받는다.', ({ money, sheets }) => {
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.buy(money);

    expect(lottos.length).toBe(sheets);
  });

  it.each([1_100, 100, -1_000, '천원'])('1000원 단위가 아닌 값으로 구매할 시 에러를 발생시킨다.', (money) => {
    expect(() => {
      const lottoMachine = new LottoMachine();
      lottoMachine.buy(money);
    }).toThrow();
  });

  // it('로또는 오름차순으로 정렬된다', () => {
  //   const lottoMachine = new LottoMachine();
  //   const lottos = lottoMachine.buy(10_000);
  //   lottos.forEach((lotto) => {
  //     expect(isAscending(lotto.numbers)).toBeTruthy();
  //   });
  // });
});
