import LottoTicketRules from "./LottoTicketRules.js";
import LottoPrizeRules from "./LottoPrizeRules.js";
import LottoVendor from "./LottoVendor.js";
import LottoPrizeCalculator from "./LottoPrizeCalculator.js";

const GAME_STAGE = Object.freeze({
  SET_PAYMENT: "SET_PAYMENT",
  SET_WINNING_NUMBERS: "SET_WINNING_NUMBERS",
  SET_BONUS_NUMBER: "SET_BONUS_NUMBER",
});

export default class LottoGame {
  #ticketRules;
  #prizeRules;
  #purchaseInfo;
  #vendor;
  #calculator;
  #stage;

  constructor(
    ticketRules = new LottoTicketRules(),
    prizeRules = new LottoPrizeRules(),
    price,
  ) {
    if (!(prizeRules instanceof LottoPrizeRules)) {
      throw new Error("로또 상금 규칙이 올바르지 않습니다.");
    }

    if (!(ticketRules instanceof LottoTicketRules)) {
      throw new Error("로또 규칙이 올바르지 않습니다.");
    }

    this.#prizeRules = prizeRules;
    this.#ticketRules = ticketRules;

    this.#vendor = new LottoVendor(price);

    this.#calculator = new LottoPrizeCalculator(
      this.#prizeRules,
      this.#ticketRules,
    );

    this.#stage = GAME_STAGE.SET_PAYMENT;
  }

  issueLottoTickets(payment) {
    this.#purchaseInfo = this.#vendor.buy(payment, this.#ticketRules);
  }

  getLottoTickets() {
    if (this.#purchaseInfo === undefined) {
      throw new Error("먼저 로또를 구매해야 합니다.");
    }

    return this.#purchaseInfo.tickets.map((ticket) => ticket.numbers);
  }

  setWinningNumbers(winningNumbers) {
    this.#calculator.setWinningNumbers(winningNumbers);
  }

  setBonusNumber(bonusNumber) {
    this.#calculator.setBonusNumber(bonusNumber);
  }

  calculatePrize(lotto) {
    return this.#calculator.calculatePrize(lotto);
  }

  calculatePrizeAllTickets() {
    if (this.#purchaseInfo === undefined) {
      throw new Error("먼저 로또를 구매해야 합니다.");
    }

    return this.#purchaseInfo.tickets.map((ticket) =>
      this.calculatePrize(ticket.numbers),
    );
  }

  getTotalPrize() {
    const results = this.calculatePrizeAllTickets();

    const totalPrize = this.#prizeRules.rules.map((rule) => ({
      ...rule,
      count: 0,
    }));

    results.forEach((result) => {
      const correctRuleIndex = totalPrize.findIndex(
        (info) => info.rank === result?.rank,
      );

      if (correctRuleIndex > -1) {
        totalPrize[correctRuleIndex].count += 1;
      }
    });

    return totalPrize;
  }

  getLottoAmount() {
    return this.#purchaseInfo.amount;
  }

  getTicketNumbersLength() {
    return this.#ticketRules.length;
  }

  getProfitRatio() {
    if (this.#purchaseInfo === undefined) {
      throw new Error("먼저 로또를 구매해야 합니다.");
    }

    if (this.#purchaseInfo.amount < 1) {
      return 0;
    }

    const totalPrize = this.getTotalPrize().reduce(
      (prev, curr) => prev + curr.count * curr.prizeAmount,
      0,
    );

    return totalPrize / (this.#purchaseInfo.amount * this.#purchaseInfo.price);
  }

  get stage() {
    return this.#stage;
  }

  set stage(stage) {
    if (!GAME_STAGE.hasOwnProperty(stage)) {
      throw Error("존재하지 않는 단계입니다.");
    }

    this.#stage = GAME_STAGE[stage];
  }

  reset() {
    this.#stage = GAME_STAGE.SET_PAYMENT;
    this.#purchaseInfo = undefined;
    this.#calculator.reset();
  }
}
