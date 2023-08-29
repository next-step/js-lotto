import { ERROR_MESSAGE } from "../utils/errorMessage";
import { Machine } from "./Machine";
import { dataStorage } from "./data.js";

describe("Machine", () => {
  beforeEach(() => {
    dataStorage.winNumbers = [];
    dataStorage.bonusNumber = 0;
  });

  it("Should validate input and return winner lotto list", () => {
    // Given
    const inputWinNumbers = "1,2,3,4,5,6";
    const expectedWinnerList = [1, 2, 3, 4, 5, 6];
    const invalidWinnerList = "0, 1, 2, 3, 4, 5";

    // When, Then
    expect(Machine.getWinnerLottoList(inputWinNumbers)).toEqual(
      expectedWinnerList
    );

    // When, Then
    expect(() => Machine.getWinnerLottoList(invalidWinnerList)).toThrow(
      ERROR_MESSAGE.VALID_NUMBER_REQUIRED
    );
  });

  it("Should validate input and return bonus number", () => {
    // Given
    const winNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumberStr = "7";
    const invalidBonusNumber = 6;

    // When, Then
    expect(Machine.getBonusNumber(winNumbers, bonusNumberStr)).toBeTruthy();
    expect(() =>
      Machine.getBonusNumber(winNumbers, invalidBonusNumber)
    ).toThrow(ERROR_MESSAGE.DUPLICATE_NOT_ALLOWED);
  });
});
