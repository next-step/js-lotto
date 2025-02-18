import LottoTicket from "../src/domain/LottoTicket";

describe("LottoTicket 클래스 테스트", () => {
  it("6개의 서로 다른 숫자를 생성해야 한다.", () => {
    const lottoTicket = new LottoTicket();
    const numbers = lottoTicket.numbers;

    expect(numbers).toHaveLength(6);
    expect(new Set(numbers).size).toBe(6);
  });

  it("로또 숫자들은 1부터 45 사이의 자연수여야 한다.", () => {
    const lottoTicket = new LottoTicket();
    const numbers = lottoTicket.numbers;

    numbers.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
      expect(Number.isInteger(num)).toBe(true);
    });
  });

  it("로또 숫자들은 오름차순으로 정렬되어야 한다.", () => {
    const lottoTicket = new LottoTicket();
    const numbers = lottoTicket.numbers;

    expect(numbers).toEqual(numbers.sort((a, b) => a - b));
  });
});
