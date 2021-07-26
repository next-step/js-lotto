import { KEY, INIT_STATE } from "../constants.js";
import { $, createEl } from "../util.js";

const Result = ({ useEffect }) => {
  const element = createEl.div();

  const calcResult = (lottoList, winningNumbers) => {
    const result = {
      3: {
        value: 0,
        reward: 5000,
      },
      4: {
        value: 0,
        reward: 50000,
      },
      5: {
        value: 0,
        reward: 1500000,
      },
      6: {
        value: 0,
        reward: 2000000000,
      },
      10: {
        value: 0,
        reward: 30000000,
      },
    };

    for (let lotto of lottoList) {
      let matchNumber = 0;
      const isMatchBonus = lotto.includes(Number(winningNumbers[6]));

      for (let i = 0; i < 6; i++) {
        if (lotto.includes(Number(winningNumbers[i]))) {
          matchNumber += 1;
        }
      }
      if (matchNumber === 5 && isMatchBonus) {
        result[10].value += 1;
      } else if (matchNumber >= 3) {
        result[matchNumber].value += 1;
      }
    }

    return result;
  };

  useEffect(
    (get, set) => {
      if (!get(KEY.SHOWING_RESULT)) {
        return (element.innerHTML = null);
      }

      const result = calcResult(get(KEY.LOTTO_LIST), get(KEY.WINNING_NUMBER));

      element.innerHTML = `<div class="modal">
  <div class="modal-inner p-10">
    <div class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </div>

    <h2 class="text-center">🏆 당첨 통계 🏆</h2>
    <div class="d-flex justify-center">
      <table class="result-table border-collapse border border-black">
        <thead>
          <tr class="text-center">
            <th class="p-3">일치 갯수</th>
            <th class="p-3">당첨금</th>
            <th class="p-3">당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td class="p-3">3개</td>
            <td class="p-3">5,000</td>
            <td class="p-3">${result[3].value}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">4개</td>
            <td class="p-3">50,000</td>
            <td class="p-3">${result[4].value}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개</td>
            <td class="p-3">1,500,000</td>
            <td class="p-3">${result[5].value}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개 + 보너스볼</td>
            <td class="p-3">30,000,000</td>
            <td class="p-3">${result[10].value}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">6개</td>
            <td class="p-3">2,000,000,000</td>
            <td class="p-3">${result[6].value}개</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-center font-bold">당신의 총 수익률은 ${
      ((Object.keys(result).reduce(
        (acc, key) => acc + result[key].value * result[key].reward,
        0
      ) -
        get(KEY.MONEY)) /
        get(KEY.MONEY)) *
      100
    }%입니다.</p>
    <div class="d-flex justify-center mt-5">
      <button type="button" id="resetButton" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
</div>`;

      const $close = $.get(".modal-close");
      $close.addEventListener("click", () =>
        set({ [KEY.SHOWING_RESULT]: false })
      );

      const $reset = $.get("#resetButton");
      $reset.addEventListener("click", () => {
        set(INIT_STATE);
      });
    },
    [KEY.WINNING_NUMBER, KEY.SHOWING_RESULT]
  );

  return element;
};

export default Result;
