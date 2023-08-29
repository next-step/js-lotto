import { Buyer } from "./Buyer";
import { dataStorage } from "./data.js";
import { LOTTO_PRICE } from "./constant.js";

describe("Buyer", () => {
  beforeEach(() => {
    dataStorage.buyerLottoList = [];
    dataStorage.lottoStats = {
      firstWinner: 0,
      secondWinner: 0,
      thirdWinner: 0,
      fourthWinner: 0,
      fifthWinner: 0,
    };
  });

  it("Should generate the specified number of lotto lists", () => {
    // Given, When,
    const lottoLists = Buyer.generateLottoList(5);

    // Then
    expect(lottoLists.length).toBe(5);
    expect(dataStorage.buyerLottoList.length).toBe(5);
  });

  it("should calculate the correct profit rate with mock data", () => {
    // Given
    dataStorage.lottoStats = {
      firstWinner: 1,
      secondWinner: 2,
      thirdWinner: 3,
      fourthWinner: 4,
      fifthWinner: 5,
    };
    const mockLottoListLength = 100;
    dataStorage.buyerLottoList = new Array(mockLottoListLength);

    const expectedTotalWinPrice =
      1 * LOTTO_PRICE.FIRST_WINNER +
      2 * LOTTO_PRICE.SECOND_WINNER +
      3 * LOTTO_PRICE.THIRD_WINNER +
      4 * LOTTO_PRICE.FOURTH_WINNER +
      5 * LOTTO_PRICE.FIFTH_WINNER;

    const expectedTotalPurchaseCost = mockLottoListLength * LOTTO_PRICE.PRICE;

    const expectedProfitRate =
      ((expectedTotalWinPrice - expectedTotalPurchaseCost) /
        expectedTotalPurchaseCost) *
      100;

    // When
    const profitRate = Buyer.calculateLottoProfit();

    // Then
    expect(profitRate).toBe(expectedProfitRate);
  });
});
