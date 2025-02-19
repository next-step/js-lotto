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
});

describe("로또 랜덤 숫자 생성 테스트", () => {
  it("숫자 6개를 생성해야 한다.", () => {
    const lottoPurchase = new LottoPurchase(1000);
    const numbers = lottoPurchase.generateLottoNumbers();

    expect(numbers.length).toBe(6);
  });

  it("서로 다른 숫자 6개여야 한다.", () => {
    const lottoPurchase = new LottoPurchase(1000);
    const numbers = lottoPurchase.generateLottoNumbers();

    expect(new Set(numbers).size).toBe(6);
  });

  it("숫자들은 1에서 45사이의 숫자여야 한다.", () => {
    const lottoPurchase = new LottoPurchase(1000);
    const numbers = lottoPurchase.generateLottoNumbers();

    const isValidRange = numbers.every((num) => num >= 1 && num <= 45);

    expect(isValidRange).toBeTruthy();
  });
});
