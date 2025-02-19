import { getRank, getReward, transformUserInput } from "../src/getRank.js";

describe("사용자가 6개의 당첨 번호와 1개의 보너스 번호를 입력한 후", () => {
  const userInput = "1, 2, 3, 4, 5, 6";
  const bonus = "7";
  const transformedNumbers = transformUserInput(userInput, bonus);
  test.each([
    ["6,1,2,3,4,5", "7", [[1, 2, 3, 4, 5, 6], 7]],
    ["4,5,6,1,2,3", "7", [[1, 2, 3, 4, 5, 6], 7]],
    ["1,2,3,4,5,6", "7", [[1, 2, 3, 4, 5, 6], 7]],
    ["3,6,5,4,2,1", "7", [[1, 2, 3, 4, 5, 6], 7]],
  ])(
    "당첨 번호와 보너스 번호가 올림 차순 배열과 보너스 번호를 가진 하나의 배열로 반환된다.",
    (userNumbers, bonus, expected) => {
      expect(transformUserInput(userNumbers, bonus)).toEqual(expected);
    }
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 8], 3],
    [[1, 2, 3, 4, 8, 9], 4],
    [[1, 2, 3, 8, 9, 10], 5],
    [[11, 12, 13, 14, 15, 16], 6],
  ])(
    "당첨 번호와 로또 번호가 일치하는 수에 따라서 등수가 반환된다.",
    (lotto, expected) => {
      expect(getRank(transformedNumbers, lotto)).toBe(expected);
    }
  );
  test.each([
    [1, 2_000_000_000],
    [2, 30_000_000],
    [3, 1_500_000],
    [4, 50_000],
    [5, 5_000],
    [6, 0],
  ])("등수(%d)에 따른 금액(%d)이 지급된다.", (rank, expectedReward) => {
    //1등 2,000,000,000
    //2등 30,000,000
    //3등 1,500,000
    //4등 50,000
    //5등 5,000
    expect(getReward(rank)).toBe(expectedReward);
  });
});
