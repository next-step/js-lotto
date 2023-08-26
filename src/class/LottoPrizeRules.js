const DEFAULT_RULES = [
  Object.freeze({
    rank: 1,
    requiresBonusNumber: false,
    matchingNumberCount: 6,
    prizeAmount: 2_000_000_000,
  }),
  Object.freeze({
    rank: 2,
    requiresBonusNumber: true,
    matchingNumberCount: 5,
    prizeAmount: 30_000_000,
  }),
  Object.freeze({
    rank: 3,
    requiresBonusNumber: false,
    matchingNumberCount: 5,
    prizeAmount: 1_500_000,
  }),
  Object.freeze({
    rank: 4,
    requiresBonusNumber: false,
    matchingNumberCount: 4,
    prizeAmount: 50_000,
  }),
  Object.freeze({
    rank: 5,
    requiresBonusNumber: false,
    matchingNumberCount: 3,
    prizeAmount: 5_000,
  }),
];

const REQUIRED_KEYS = ["rank", "matchingNumberCount", "prizeAmount"];

export default class LottoPrizeRules {
  #rules;

  #validateRulesProperty = (rules) => {
    if (!Array.isArray(rules)) {
      throw new Error("상금 규칙은 배열이어야 합니다.");
    }

    const isAllRequiredKeysExist = rules.every((rule) =>
      REQUIRED_KEYS.every((key) => rule.hasOwnProperty(key)),
    );

    if (!isAllRequiredKeysExist) {
      throw new Error("상금 규칙 중 없는 값이 있습니다.");
    }
  };

  #validateRuleFormat = (rules) => {
    rules.forEach((rule) => {
      const { rank, matchingNumberCount, prizeAmount, requiresBonusNumber } =
        rule;

      if (
        typeof rank !== "number" ||
        typeof matchingNumberCount !== "number" ||
        typeof prizeAmount !== "number" ||
        (typeof requiresBonusNumber !== "undefined" &&
          typeof requiresBonusNumber !== "boolean")
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

  constructor(rules = DEFAULT_RULES) {
    this.#validateRulesProperty(rules);

    this.#validateRuleFormat(rules);

    this.#checkDuplicateRank(rules);

    this.#rules = rules.map((rule) => ({
      ...rule,
    }));
  }

  get rules() {
    return [...this.#rules];
  }

  getSingleRule(rank) {
    const rule = this.#rules.find((rule) => rule.rank === rank);

    if (rule === undefined) {
      throw new Error("존재하지 않는 규칙입니다.");
    }

    return { ...rule };
  }
}
