import { isNumber } from "./util";

export default class Lotto {
  // 로또 번호의 갯수
  #LOTTO_NUMBER_COUNT = 6;
  #RANK = {
    1: {
      rank: 1,
      reward: 2000000000,
      displayString: `${this.#LOTTO_NUMBER_COUNT}개 번호 일치`,
    },
    2: {
      rank: 2,
      reward: 30000000,
      displayString: `${
        this.#LOTTO_NUMBER_COUNT - 1
      }개 번호 + 보너스 번호 일치`,
    },
    3: {
      rank: 3,
      reward: 1500000,
      displayString: `${this.#LOTTO_NUMBER_COUNT - 1}개 번호 일치`,
    },
    4: {
      rank: 4,
      reward: 50000,
      displayString: `${this.#LOTTO_NUMBER_COUNT - 2}개 번호 일치`,
    },
    5: {
      rank: 5,
      reward: 5000,
      displayString: `${this.#LOTTO_NUMBER_COUNT - 3}개 번호 일치`,
    },
  };
  #lottoPrice = 1000;
  // 구입한 로또에 대한 배열
  #lottos = [];
  #winningNumber = [];
  #bonusNumber;

  get getLottoNumberCount() {
    return this.#LOTTO_NUMBER_COUNT;
  }

  getLottoQuantityByMoney(money) {
    if (!isNumber(money)) {
      return 0;
    }
    return Math.floor(money / this.#lottoPrice);
  }

  getLottoNumber() {
    return Array(this.#LOTTO_NUMBER_COUNT)
      .fill()
      .map(() => this.#getRandomNumber());
  }

  #getRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  getWinningNumberByString(winneingNumberString) {
    const winningNumberArray = winneingNumberString.split(",");

    const isInvalidWinningNumber = winningNumberArray.some((winningNumber) => {
      return !isNumber(winningNumber);
    });

    if (isInvalidWinningNumber) {
      throw new Error();
    }

    if (winningNumberArray.length !== this.#LOTTO_NUMBER_COUNT) {
      throw new Error();
    }

    return winningNumberArray;
  }

  setWinningNumber(winningNumberArray) {
    this.#winningNumber = winningNumberArray;
  }

  setBounsNumber(bounsNumber) {
    this.#bonusNumber = bounsNumber;
  }

  getRankCount() {
    const rankCount = this.#lottos.reduce(
      (acc, cur) => {
        const hitNumber = this.getHitNumberByLottoNumber(cur);
        const rank = this.getReward(hitNumber);
        if (!rank) {
          return acc;
        }
        acc[rank.rank] += 1;
        return acc;
      },
      {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      }
    );

    return rankCount;
  }

  getReward(rank) {
    const hitNumberCount = rank.hitNumberCount;
    if (hitNumberCount === 3) {
      return this.#RANK[5];
    }

    if (hitNumberCount === 4) {
      return this.#RANK[4];
    }

    if (hitNumberCount === 5 && rank.isHitBonusNumber) {
      return this.#RANK[2];
    }

    if (hitNumberCount === 5) {
      return this.#RANK[3];
    }

    if (hitNumberCount === 6) {
      return this.#RANK[1];
    }

    return this.#RANK[6];
  }

  getHitNumberByLottoNumber(lottNumberArray) {
    const rank = lottNumberArray.reduce(
      (acc, cur, i) => {
        this.#winningNumber.forEach((winningNumber) => {
          if (winningNumber === cur) {
            acc.hitNumberCount += 1;
          }
        });

        this.#bonusNumber === cur ? (acc.isHitBonusNumber = true) : null;

        return acc;
      },
      {
        hitNumberCount: 0,
        isHitBonusNumber: false,
      }
    );

    return rank;
  }

  getDisplayStringByRankCount(rankCount) {
    return this.#RANK[rankCount].displayString;
  }

  getRewardByRank(rank) {
    return this.#RANK[rank];
  }

  getProfitRate(initialInvestment, profit) {
    const profitRate = (profit / initialInvestment) * 100;
    return profitRate.toFixed(2); // 소수점 둘째 자리까지 반올림하여 반환
  }
}
