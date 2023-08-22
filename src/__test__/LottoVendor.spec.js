import LottoVendor from "../class/LottoVendor";
import LottoTicket from "../class/LottoTicket";

describe("LottoVendor 클래스 테스트", () => {
  test.each(["test", {}, () => {}])(
    "로또 가격이 number가 아니면 에러가 발생한다",
    (price) => {
      expect(() => new LottoVendor(price)).toThrowError(
        "가격은 number 이어야 합니다.",
      );
    },
  );

  test.each([-1, 0])("로또 가격이 0이하이면 가격은 기본값이다.", (price) => {
    const vendor = new LottoVendor(price);

    expect(vendor.price).toBe(vendor.defaultPrice);
  });

  test.each(["test", {}, () => {}, undefined])(
    "지불 금액이 number가 아니면 에러가 발생한다",
    (payment) => {
      const vendor = new LottoVendor();

      expect(() => vendor.buy(payment)).toThrowError(
        "지불 금액은 number 이어야 합니다.",
      );
    },
  );

  test("지불 금액이 number 0보다 작으면 에러가 발생한다.", () => {
    const vendor = new LottoVendor();

    expect(() => vendor.buy(-1)).toThrowError(
      "지불 금액은 0이상 이어야 합니다.",
    );
  });

  test.each`
    price   | payment | amount | change
    ${1000} | ${8000} | ${8}   | ${0}
    ${1000} | ${0}    | ${0}   | ${0}
    ${1200} | ${5321} | ${4}   | ${521}
  `(
    "로또 가격이 $price 일때 $payment 지불시 로또 $amount 장이 발급된다.",
    ({ price, payment, amount, change }) => {
      const vendor = new LottoVendor(price);

      const receipt = vendor.buy(payment);

      expect(receipt.price).toBe(price);
      expect(receipt.amount).toBe(amount);
      expect(receipt.change).toBe(change);
      expect(receipt.tickets.length).toBe(amount);
      expect(
        receipt.tickets.every((ticket) => ticket instanceof LottoTicket),
      ).toBe(true);
    },
  );
});
