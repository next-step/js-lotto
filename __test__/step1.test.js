import LottoController from "../src/js/controllers/step1/LottoController.js";
import LottoTicket from "../src/js/models/LottoTicket.js";

describe(`로또 당첨 번호 테스트: `, () => {
  it(`로또 번호는 1에서 45 사이여야 한다.`, () => {
    const lottoController = new LottoController();
    const winningNumbers = lottoController.drawLottoNumbers();

    winningNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  it(`당첨 번호는 1에서 45 사이여야 한다.`, () => {
    const lottoController = new LottoController();
    const winningNumbers = lottoController.drawLottoNumbers();

    winningNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });
});

describe(`로또 구입 테스트: `, () => {
  it(`로또 한 장의 가격은 1000원이다.`, () => {
    expect(LottoTicket.price).toBe(1000);
  });

  it(`로또 구입 금액을 입력한만큼 로또를 발행해야 한다.`, () => {
    const lottoController = new LottoController();
    const lottoTickets = lottoController.issueLottoTickets(8000);

    expect(lottoTickets.length).toBe(8);
  });
});
