import {LOTTO, LOTTO_REVENUE} from "./constants/index.js";
import {selector} from "./constants/selector.js";
import {generateRandomList} from "./utils/index.js";
import {lottoAndNumberView} from "./view.js";

export const issueLotto = (number) => {
  selector.lottoContainer.innerHTML = null;
  selector.lottoCounter.innerText = number;

  const randomList = Array.from({length: number}, () => [
    ...generateRandomList(),
  ]);

  // /**@TODO N회 렌더링 제거할 것 */
  randomList.map((list) =>
    selector.lottoContainer.insertAdjacentHTML(
      "beforeend",
      lottoAndNumberView(list)
    )
  );
};

export const buyLotto = (payment) => {
  const numberOfLotto = Math.floor(payment / LOTTO.PRICE);
  if (!numberOfLotto) return;

  issueLotto(numberOfLotto);
};

const isBonusNumber = (arr1, arr2) => {
  arr1.at(-1) === arr2.at(-1);
};

const compareWithTwoArray = (winning, random) =>
  winning.reduce((acc, cur) => (random.includes(cur) ? acc + 1 : acc), 0);

export const rankLotto = (winningNumbers, randomNumbers) => {
  const rankResult = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  randomNumbers.forEach((randomNumbers) => {
    const sameCount = compareWithTwoArray(winningNumbers, randomNumbers);
    switch (sameCount) {
      case 3:
        rankResult.fifth += 1;
        break;
      case 4:
        rankResult.fourth += 1;
        break;
      case 5:
        rankResult.third += 1;
        break;
      case 6:
        if (isBonusNumber(winningNumbers, randomNumbers)) {
          rankResult.second += 1;
        } else {
          rankResult.first += 1;
        }
        break;
    }
  });

  return rankResult;
};

export const priceEarningRatio = (purchasePrice, rankResult) => {
  const {first, second, third, fourth, fifth} = rankResult;

  const totalRevenue =
    fifth * LOTTO_REVENUE.FIFTH +
    fourth * LOTTO_REVENUE.FOURTH +
    third * LOTTO_REVENUE.THIRD +
    second * LOTTO_REVENUE.SECOND +
    first * LOTTO_REVENUE.FIRST;

  const totalRatio = ((totalRevenue - purchasePrice) / purchasePrice) * 100;

  return totalRatio;
};
