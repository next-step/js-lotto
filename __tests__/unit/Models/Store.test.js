import { Store } from '../../../src/Model';
import { LottoTicket } from '../../../src/Model';

class Pengoose {
  constructor() {}
}

const mockProducts = {
  LottoTicket: {
    product: LottoTicket,
    price: 1_000,
  },
  Pengoose: {
    product: Pengoose,
    price: 10_000,
  },
};

/**
 * 상점은 생성자에서 판매할 상품들을 주입받는다.
 * 상점은 주입받은 상품들을 판매한다.
 */

describe('Store는 주입받은 상품들을 판매할 수 있다.', () => {
  const store = new Store(mockProducts);

  test('상점에 돈을 지불하고 로또를 5장 구매한다.', () => {
    const tickets = store.buyProduct('LottoTicket', 5_000);

    expect(tickets.length).toBe(5);
    tickets.forEach((ticket) => expect(ticket).toBeInstanceOf(LottoTicket));
  });

  test('상품의 단위금액과 맞아떨어지지 않더라도, 구매 가능한 상품의 개수를 전달한다.', () => {
    const tickets = store.buyProduct('LottoTicket', 5_500);

    expect(tickets.length).toBe(5);
    tickets.forEach((ticket) => expect(ticket).toBeInstanceOf(LottoTicket));
  });

  test('products 목록에 없는 productName이 들어오면 예외처리한다.', () => {
    const inValidProductName = 'Penguin';

    expect(() => store.buyProduct(inValidProductName, 10_000)).toThrow();
  });

  test('상품의 가격보다 구입금액이 적은 경우, 예외처리한다.', () => {
    const inValidPurchaseAmount = 900;

    expect(() =>
      store.buyProduct('LottoTicket', inValidPurchaseAmount)
    ).toThrow();
  });
});
