import Lotto from "../src/domain/Lotto";
import LottoPurchase from "../src/domain/LottoPurchase";

describe("로또 구매 테스트", () => {
  it("로또를 구매하면 로또 배열을 반환한다.", () => {
    const lottoTickets = new LottoPurchase(5000);
    expect(
      lottoTickets.lottoTickets.every((ticket) => ticket instanceof Lotto)
    ).toBeTruthy();
  });

  it("1000원을 넣으면 로또 1장을 생성한다.", () => {
    const lottoTickets = new LottoPurchase(1000);

    expect(lottoTickets.lottoTickets.length).toBe(1);
  });

  it("4000원을 넣으면 로또 4장을 생성한다.", () => {
    const lottoTickets = new LottoPurchase(4000);

    expect(lottoTickets.lottoTickets.length).toBe(4);
  });

  it("1000원을 넣으면 로또 2장을 생성하지 않는다.", () => {
    const lottoTickets = new LottoPurchase(1000);

    expect(lottoTickets.lottoTickets.length == 2).toBeFalsy();
  });

  it("4000원을 넣으면 로또 3장을 생성하지 않는다.", () => {
    const lottoTickets = new LottoPurchase(4000);

    expect(lottoTickets.lottoTickets.length === 3).toBeFalsy();
  });
});
