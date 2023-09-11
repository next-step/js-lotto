import { createInterface } from "node:readline/promises";
import { LOTTO_MAX_NUM, LOTTO_MIN_NUM } from "../src/js/constants.js";
import LottoController from "../src/js/controllers/step1/LottoController.js";

describe(`로또 당첨 번호 테스트: `, () => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  it(`로또 번호는 ${LOTTO_MIN_NUM}에서 ${LOTTO_MAX_NUM} 사이여야 한다.`, () => {
    const lottoController = new LottoController(readline);
    const winningNumbers = lottoController.drawLottoNumbers();

    winningNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_MIN_NUM);
      expect(number).toBeLessThanOrEqual(LOTTO_MAX_NUM);
    });
  });

  it(`당첨 번호는 ${LOTTO_MIN_NUM}에서 ${LOTTO_MAX_NUM} 사이여야 한다.`, () => {
    const lottoController = new LottoController();
    const winningNumbers = lottoController.drawLottoNumbers();

    winningNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_MIN_NUM);
      expect(number).toBeLessThanOrEqual(LOTTO_MAX_NUM);
    });
  });
});

describe(`로또 구입 테스트: `, () => {
  it("로또 구입 금액으로 8,000원을 입력하면 로또 8장이 발행되어야 한다.", () => {
    const lottoController = new LottoController();
    const lottoTickets = lottoController.issueLottoTickets(8000);

    expect(lottoTickets.length).toBe(8);
  });
});
