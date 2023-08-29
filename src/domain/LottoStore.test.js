import { LottoStore } from "./LottoStore";

describe("calculateLottoAmount", () => {
  it("should validate input and return calculated lotto amount", () => {
    // Given
    const amount = 1450;
    const expectedLottoAmount = 1;

    // When
    const result = LottoStore.calculateLottoAmount(amount);

    // Then
    expect(result).toBe(expectedLottoAmount);
  });
});
