import { getRank, getReward, transformUserInput } from "../src/getRank.js";

describe("사용자가 6개의 당첨 번호와 1개의 보너스 번호를 입력한 후", () => {
  const userInput = "1, 2, 3, 4, 5, 6";
  const bonus = "7";
  const transformedNumbers = transformUserInput(userInput, bonus);
  test("당첨 번호와 보너스 번호가 하나의 배열로 반환된다.", () => {
    expect(transformedNumbers).toEqual([[1, 2, 3, 4, 5, 6], 7]);
  });

  test("모든 당첨 번호가 일치하면 1등이다.", () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    expect(getRank(transformedNumbers, lotto)).toBe(1);
  });
  test("당첨 번호 중 5개 번호와 보너스 번호가 일치하면 2등이다.", () => {
    const lotto = [1, 2, 3, 4, 5, 7];
    expect(getRank(transformedNumbers, lotto)).toBe(2);
  });
  test("5개의 당첨 번호가 일치하면 3등이다.", () => {
    const lotto = [1, 2, 3, 4, 5, 8];
    expect(getRank(transformedNumbers, lotto)).toBe(3);
  });
  test("4개의 당첨 번호가 일치하면 4등이다.", () => {
    const lotto = [1, 2, 3, 4, 8, 9];
    expect(getRank(transformedNumbers, lotto)).toBe(4);
  });
  test("3개의 당첨 번호가 일치하면 5등이다.", () => {
    const lotto = [1, 2, 3, 8, 9, 10];
    expect(getRank(transformedNumbers, lotto)).toBe(5);
  });
  test("등수에 따른 금액이 지급된다.", () => {
    //1등 2,000,000,000
    //2등 30,000,000
    //3등 1,500,000
    //4등 50,000
    //5등 5,000
    expect(getReward(1)).toBe(2000000000);
    expect(getReward(2)).toBe(30000000);
    expect(getReward(3)).toBe(1500000);
    expect(getReward(4)).toBe(50000);
    expect(getReward(5)).toBe(5000);
  });
});
