import LottoGame from "../class/LottoGame";

describe("LottoGame 클래스 테스트", () => {
  test.each`
    payment | prize   | profitRate
    ${0}    | ${0}    | ${0}
    ${8000} | ${5000} | ${0.625}
  `(
    "지불 금액이 $payment , 상금이 $prize 일때 수익률은 $profitRate 이다.",
    ({ payment, prize, profitRate }) => {
      const game = new LottoGame();

      expect(game.calculateProfitRate(payment, prize)).toBe(profitRate);
    },
  );
});
