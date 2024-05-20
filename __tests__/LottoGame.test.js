import {
  LOTTO_GAME_RANK,
  LOTTO_GAME_PRIZE,
} from "../src/js/domain/lotto-game/lotto-game.constant.js";
import LottoGame from "../src/js/domain/lotto-game/lotto-game.model.js";

describe("로또 당첨", () => {
  const winnerNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const numbersWithRank = [
    { numbers: [1, 2, 3, 4, 5, 6], rank: LOTTO_GAME_RANK.FIRST },
    { numbers: [1, 2, 3, 4, 5, 7], rank: LOTTO_GAME_RANK.SECOND },
    { numbers: [1, 2, 3, 4, 5, 8], rank: LOTTO_GAME_RANK.THIRD },
    { numbers: [1, 2, 3, 4, 8, 9], rank: LOTTO_GAME_RANK.FOURTH },
    { numbers: [1, 2, 3, 8, 9, 10], rank: LOTTO_GAME_RANK.FIFTH },
    { numbers: [1, 2, 8, 9, 10, 11], rank: LOTTO_GAME_RANK.NONE },
  ];
  const rankWithPrize = [
    {
      rank: LOTTO_GAME_RANK.FIRST,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FIRST],
    },
    {
      rank: LOTTO_GAME_RANK.SECOND,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.SECOND],
    },
    {
      rank: LOTTO_GAME_RANK.THIRD,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.THIRD],
    },
    {
      rank: LOTTO_GAME_RANK.FOURTH,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FOURTH],
    },
    {
      rank: LOTTO_GAME_RANK.FIFTH,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.FIFTH],
    },
    {
      rank: LOTTO_GAME_RANK.NONE,
      prize: LOTTO_GAME_PRIZE[LOTTO_GAME_RANK.NONE],
    },
  ];
  const lottoGame = new LottoGame(winnerNumbers, bonusNumber);

  describe("로또 번호와 당첨 번호를 비교하여 등수를 반환한다.", () => {
    numbersWithRank.forEach(({ numbers, rank }) => {
      test(`${rank}등 등수`, () => {
        expect(lottoGame.rank(numbers)).toBe(rank);
      });
    });
  });

  describe("등수를 입력하면 상금을 반환한다.", () => {
    rankWithPrize.forEach(({ rank, prize }) => {
      test(`${rank}등 상금`, () => {
        expect(lottoGame.prize(rank)).toBe(prize);
      });
    });
  });
});
