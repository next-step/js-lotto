import { LottoMainCompany } from "./LottoMainCompany";
import { dataStorage } from "./data.js";

describe("LottoMainCompany", () => {
  beforeEach(() => {
    dataStorage.buyerLottoList = [];
    dataStorage.winNumbers = [];
    dataStorage.bonusNumber = 0;
    dataStorage.lottoStats = {
      firstWinner: 0,
      secondWinner: 0,
      thirdWinner: 0,
      fourthWinner: 0,
      fifthWinner: 0,
    };
  });

  it("Should update lottoStats based on mock data", () => {
    // Given
    dataStorage.buyerLottoList = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 5, 66],
      [1, 2, 3, 4, 55, 66],
      [1, 2, 3, 44, 55, 66],
    ];

    dataStorage.winNumbers = [1, 2, 3, 4, 5, 6];
    dataStorage.bonusNumber = 7;

    // When
    LottoMainCompany.handleWinnerStats();

    // Then
    expect(dataStorage.lottoStats.firstWinner).toBe(1);
    expect(dataStorage.lottoStats.secondWinner).toBe(1);
    expect(dataStorage.lottoStats.thirdWinner).toBe(1);
    expect(dataStorage.lottoStats.fourthWinner).toBe(1);
    expect(dataStorage.lottoStats.fifthWinner).toBe(1);
  });
});
