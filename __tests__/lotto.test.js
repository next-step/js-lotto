import { ERROR_MESSAGES, LOTTO_PRICE } from "../src/constants";
import { Lotto } from "../src/domain/models/Lotto";

describe("Lotto Purchase Logic", () => {
  test("should return the correct number of lotto tickets based on the purchase amount", () => {
    const lotto = new Lotto(LOTTO_PRICE * 2);
    expect(lotto.getNumberOfTickets()).toBe(2);
  });

  test("should throw an error if the purchase amount is not a multiple of 1000", () => {
    expect(() => new Lotto(LOTTO_PRICE * 2.5)).toThrow(
      ERROR_MESSAGES.PURCHASE_INVALID_MULTIPLE,
    );
  });

  test("should throw an error if the purchase amount is 0 or negative", () => {
    expect(() => new Lotto(0)).toThrow(ERROR_MESSAGES.PURCHASE_INVALID_AMOUNT);
    expect(() => new Lotto(-1000)).toThrow(
      ERROR_MESSAGES.PURCHASE_INVALID_AMOUNT,
    );
  });

  test("should generate the correct number of tickets", () => {
    const lotto = new Lotto(LOTTO_PRICE * 10);
    const tickets = lotto.generateLottoTickets();
    expect(tickets.length).toBe(10);
  });
});

describe("Lotto Number Generation", () => {
  test("should generate lotto numbers between 1 and 45", () => {
    const lotto = new Lotto(LOTTO_PRICE * 1);
    const tickets = lotto.generateLottoTickets();

    tickets[0].forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test("should generate 6 unique numbers for each lotto ticket", () => {
    const lotto = new Lotto(LOTTO_PRICE * 1);
    const tickets = lotto.generateLottoTickets();
    expect(tickets[0].length).toBe(6);

    const uniqueNumbers = new Set(tickets[0]);
    expect(uniqueNumbers.size).toBe(tickets[0].length);
  });

  test("should generate different tickets", () => {
    const lotto = new Lotto(LOTTO_PRICE * 2);
    const tickets = lotto.generateLottoTickets();
    console.log(tickets);
    expect(tickets[0]).not.toEqual(tickets[1]);
  });
});
