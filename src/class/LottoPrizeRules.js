export default class LottoPrizeRules {
  #rules;
  #defaultRules = [
    Object.freeze({
      rank: 1,
      requiresBonusNumber: false,
      matchingNumberCount: 6,
      prizeAmount: 2000000000,
    }),
    Object.freeze({
      rank: 2,
      requiresBonusNumber: true,
      matchingNumberCount: 5,
      prizeAmount: 30000000,
    }),
    Object.freeze({
      rank: 3,
      requiresBonusNumber: false,
      matchingNumberCount: 5,
      prizeAmount: 1500000,
    }),
    Object.freeze({
      rank: 4,
      requiresBonusNumber: false,
      matchingNumberCount: 4,
      prizeAmount: 50000,
    }),
    Object.freeze({
      rank: 5,
      requiresBonusNumber: false,
      matchingNumberCount: 3,
      prizeAmount: 5000,
    }),
  ];

  static #REQUIRED_KEYS = ["rank", "matchingNumberCount", "prizeAmount"];

  #validateRulesProperty = (rules) => {
    if (!Array.isArray(rules)) {
      return false;
    }

    return rules.every((rule) =>
      LottoPrizeRules.#REQUIRED_KEYS.every((key) => rule.hasOwnProperty(key)),
    );
  };

  #validateRuleFormat = (rules) => {
    rules.forEach((rule) => {
      const { rank, matchingNumberCount, prizeAmount } = rule;

      if (
        typeof rank !== "number" ||
        typeof matchingNumberCount !== "number" ||
        typeof prizeAmount !== "number"
      ) {
        throw new Error("규칙의 자료형이 일치하지 않습니다.");
      }

      if (matchingNumberCount < 0 || !Number.isInteger(matchingNumberCount)) {
        throw new Error("번호 일치 개수의 형식이 올바르지 않습니다.");
      }

      if (rank < 1 || !Number.isInteger(rank)) {
        throw new Error("등수의 형식이 올바르지 않습니다.");
      }
    });
  };

  #checkDuplicateRank = (rules) => {
    const ranks = rules.map((rule) => rule.rank);

    const setRanks = new Set(ranks);

    if (ranks.length !== setRanks.size) {
      throw new Error("규칙의 등수는 중복될 수 없습니다.");
    }
  };

  constructor(rules) {
    const isRulesFormatValid = this.#validateRulesProperty(rules);

    if (!isRulesFormatValid) {
      this.#rules = [...this.#defaultRules];
      return;
    }

    this.#validateRuleFormat(rules);

    this.#checkDuplicateRank(rules);

    this.#rules = rules.map((rule) => ({
      ...rule,
      requiresBonusNumber:
        typeof rule.requiresBonusNumber === "boolean"
          ? rule.requiresBonusNumber
          : false,
    }));
  }

  get rules() {
    return [...this.#rules];
  }

  get defaultRules() {
    return [...this.#defaultRules];
  }

  getSingleRule(rank) {
    const rule = this.#rules.find((rule) => rule.rank === rank);

    if (rule === undefined) {
      throw new Error("존재하지 않는 규칙입니다.");
    }

    return { ...rule };
  }
}
