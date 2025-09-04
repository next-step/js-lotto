import { buyLotto, generateLottoBundle } from "../src/domain/purchase.js";

describe("로또 구입", () => {
  test("로또 구입 금액 5000원을 입력하면, 로또 5개를 살 수 있다.", async () => {
    const AMOUNT_PAID = 5000;

    const result = buyLotto(AMOUNT_PAID);
    console.log("result", result);
    expect(result).toBe(5);
  });

  test("로또 구입 금액 900원을 입력하면, 로또를 살 수 없다는 에러가 뜬다.", async () => {
    const AMOUNT_PAID = 900;

    expect(() => buyLotto(AMOUNT_PAID)).toThrow(
      "로또는 1,000원 이상부터 구매 가능합니다."
    );
  });

  test("구입한 로또가 0개이면, 구매한 로또가 존재하지 않는다는 에러가 뜬다.", async () => {
    const PURCHASED_LOTTO_COUNT = 0;

    expect(() => generateLottoBundle(PURCHASED_LOTTO_COUNT)).toThrow(
      "구매한 로또가 존재하지 않습니다."
    );
  });

  test("구입한 로또가 5개이면, 5줄의 로또 번호를 출력한다.", async () => {
    const PURCHASED_LOTTO_COUNT = 5;

    console.log(generateLottoBundle(PURCHASED_LOTTO_COUNT));

    expect(generateLottoBundle(PURCHASED_LOTTO_COUNT)).toHaveLength(5);
  });
});
