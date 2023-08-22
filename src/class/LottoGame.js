import LottoTicketRules from "./LottoTicketRules";
import LottoPrizeRules from "./LottoPrizeRules";
import LottoVendor from "./LottoVendor";
import LottoPrizeCalculator from "./LottoPrizeCalculator";

export default class LottoGame {
  #ticketRules;
  #prizeRules;
  #purchaseInfo;
  #vendor;
  #calculator;

  constructor(ticketRules, prizeRules, price) {
    this.#ticketRules =
      ticketRules instanceof LottoTicketRules
        ? ticketRules
        : new LottoTicketRules();

    this.#prizeRules =
      prizeRules instanceof LottoPrizeRules
        ? prizeRules
        : new LottoPrizeRules();

    this.#vendor = new LottoVendor(price);

    this.#calculator = new LottoPrizeCalculator(
      this.#prizeRules,
      this.#ticketRules,
    );
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
      this.calculatePrize(ticket),
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
}
