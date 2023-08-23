import LottoTicket from "../class/LottoTicket.js";

describe("LottoTicket 클래스 테스트", () => {
  let lottoNumbers;
  let lottoTicket;

  beforeEach(() => {
    lottoTicket = new LottoTicket();

    lottoNumbers = lottoTicket.numbers;
  });

  test("로또 번호는 1~43 사이의 정수이다.", () => {
    expect(
      lottoNumbers.every(
        (number) =>
          number >= lottoTicket.rule.min && number <= lottoTicket.rule.max,
      ),
    ).toBe(true);
  });

  test("로또 번호는 6개이다.", () => {
    expect(lottoNumbers.length).toBe(lottoTicket.rule.length);
  });

  test("로또 번호는 서로 중복되지 않는다.", () => {
    const lottoNumbersSet = new Set(lottoNumbers);

    expect(lottoNumbers.length).toBe(lottoNumbersSet.size);
  });
});
