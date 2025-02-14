import { getRank, getReward } from "../src/getRank.js";

describe("사용자가 6개의 당첨 번호와 1개의 보너스 번호를 입력한 후", () => {
  const userInput = [1, 2, 3, 4, 5, 6];
  const bonus = 7;

  test("모든 당첨 번호가 일치하면 1등이다.", () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    expect(getRank(userInput, bonus, lotto)).toBe(1);
  });
  test("당첨 번호 중 5개 번호와 보너스 번호가 일치하면 2등이다.", () => {
    const lotto = [1, 2, 3, 4, 5, 7];
    expect(getRank(userInput, bonus, lotto)).toBe(2);
  });
  test("5개의 번호가 일치하면 3등이다.", () => {
    const lotto = [1, 2, 3, 4, 7, 8];
    expect(getRank(userInput, bonus, lotto)).toBe(3);
  });
  test("4개의 번호가 일치하면 4등이다.", () => {
    const lotto = [1, 2, 3, 4, 8, 9];
    expect(getRank(userInput, bonus, lotto)).toBe(4);
  });
  test("3개의 번호가 일치하면 5등이다.", () => {
    const lotto = [1, 2, 3, 8, 9, 10];
    expect(getRank(userInput, bonus, lotto)).toBe(5);
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
