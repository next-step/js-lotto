import { getWinningPrizeResult } from "../src/controller/lottoController.js";
import { displayWinningStats } from "../src/view/view.js";

describe("로또 번호와 당첨 번호를 비교한 후 수익률을 출력합니다.", () => {
  const lottoNumbers = [
    [1, 2, 3, 4, 5, 6],
    [2, 24, 34, 6, 7, 19],
    [33, 3, 6, 8, 10, 9],
  ];

  test("6개의 번호가 모두 일치하여 1등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 7, 19, 45];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("5개의 번호와 보너스 번호가 일치하여 2등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("5개의 번호가 모두 일치하여 3등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 34, 8, 12, 45];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("4개의 번호가 모두 일치하여 4등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 24, 35, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });

  test("3개의 번호가 모두 일치하여 5등 당첨입니다.", () => {
    const winningNumbers = [1, 2, 25, 35, 8, 12, 4];

    const winningResult = getWinningPrizeResult(lottoNumbers, winningNumbers);
    displayWinningStats(winningResult);
  });
});
