import {
  WINNING_1ST_MATCH_CASE,
  WINNING_2ND_MATCH_CASE,
  WINNING_3RD_MATCH_CASE,
  WINNING_4TH_MATCH_CASE,
  WINNING_5TH_MATCH_CASE,
  WINNING_1ST,
  WINNING_2ND,
  WINNING_3RD,
  WINNING_4TH,
  WINNING_5TH,
  WINNING_FAIL,
  WINNING_RESULT_CASE,
} from './constants/lotto.js';

export default class WinningLotto {
  static #isDuplicatedWinningNumber(winningNumberList, winningNumber) {
    return (
      winningNumberList.filter(
        (winningNumberInList) => winningNumberInList === winningNumber
      ).length > 1
    );
  }

  static isInvalidWinningNumbers(winningNumberList) {
    return winningNumberList.some((winningNumber) =>
      WinningLotto.#isDuplicatedWinningNumber(winningNumberList, winningNumber)
    );
  }

  static #getWinningDigit(lottoNumbers, winningNumbers) {
    return lottoNumbers.filter((number) =>
      winningNumbers.some((winningNumber) => winningNumber === number)
    ).length;
  }

  static #getWinningResultFromLotto({
    lottoNumbers,
    winningNumbers,
    bonusNumber,
  }) {
    if (
      WinningLotto.#getWinningDigit(lottoNumbers, winningNumbers) ===
      WINNING_1ST_MATCH_CASE
    ) {
      return WINNING_1ST;
    }

    if (
      WinningLotto.#getWinningDigit(lottoNumbers, winningNumbers) ===
        WINNING_2ND_MATCH_CASE &&
      lottoNumbers.some((number) => number === bonusNumber)
    ) {
      return WINNING_2ND;
    }

    if (
      WinningLotto.#getWinningDigit(lottoNumbers, winningNumbers) ===
      WINNING_3RD_MATCH_CASE
    ) {
      return WINNING_3RD;
    }

    if (
      WinningLotto.#getWinningDigit(lottoNumbers, winningNumbers) ===
      WINNING_4TH_MATCH_CASE
    ) {
      return WINNING_4TH;
    }

    if (
      WinningLotto.#getWinningDigit(lottoNumbers, winningNumbers) ===
      WINNING_5TH_MATCH_CASE
    ) {
      return WINNING_5TH;
    }

    return WINNING_FAIL;
  }

  static winningResult({ lottoList, winningNumbers, bonusNumber }) {
    const result = {
      [WINNING_1ST]: 0,
      [WINNING_2ND]: 0,
      [WINNING_3RD]: 0,
      [WINNING_4TH]: 0,
      [WINNING_5TH]: 0,
      [WINNING_FAIL]: 0,
    };
    lottoList.forEach((lotto) => {
      const winningResult = WinningLotto.#getWinningResultFromLotto({
        lottoNumbers: lotto.split(','),
        winningNumbers,
        bonusNumber,
      });
      result[winningResult] += 1;
    });
    return result;
  }

  static totalRevenue(winningResult) {
    return Object.entries(winningResult).reduce(
      (result, [resultCase, value]) => {
        const RESULT_CASE_KEY = Number(resultCase);
        if (RESULT_CASE_KEY === WINNING_FAIL) {
          return result;
        }

        return (
          result +
          value *
            WINNING_RESULT_CASE.find(
              (winningCase) => winningCase.key === RESULT_CASE_KEY
            ).reward
        );
      },
      0
    );
  }
}
