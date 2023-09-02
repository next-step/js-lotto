import { createLottosForAmount } from "../src/controller/lottoController.js";

describe("구입한 로또 번호를 확인합니다.", () => {
  const availableLottoTicketsCount = 3;
  const lottoNumbers = createLottosForAmount(availableLottoTicketsCount);

  test("로또 번호는 6개의 숫자로 이루어져 있습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      expect(numberArr).toHaveLength(6);

      numberArr.forEach((number) => {
        expect(typeof number).toBe("number");
      });
    });
  });

  test("로또 번호들은 1 ~ 45까지의 수로 되어있습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      numberArr.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  test("하나의 로또 번호 내에서는 중복이 될 수 없습니다.", () => {
    lottoNumbers.forEach((numberArr) => {
      const uniqueLottoNumbers = new Set(numberArr);
      expect(uniqueLottoNumbers.size).toBe(numberArr.length);
    });
  });
});
