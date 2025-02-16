import { LOTTO_PRICE } from "../src/constants";
import { Lotto } from "../src/domain/models/Lotto";

describe("Lotto Purchase Logic", () => {
  test("should return the correct number of lotto tickets based on the purchase amount", () => {
    const lotto = new Lotto(LOTTO_PRICE * 2);
    expect(lotto.getNumberOfTickets()).toBe(2);
  });

  test("should throw an error if the purchase amount is not a multiple of 1000", () => {
    expect(() => new Lotto(LOTTO_PRICE * 2.5)).toThrow(
      "You can only buy lotto in multiples of 1,000.",
    );
  });

  test("should throw an error if the purchase amount is 0 or negative", () => {
    expect(() => new Lotto(0)).toThrow("Amount must be greater than 0");
    expect(() => new Lotto(-1000)).toThrow("Amount must be greater than 0");
  });
});
