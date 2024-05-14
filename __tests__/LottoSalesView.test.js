import LottoSalesView from "../src/js/domain/lotto-sales/lotto-sales.view.js";
import readLineAsync from "../src/js/utils/readLineAsync.js";

jest.mock("../src/js/utils/readLineAsync.js", () => jest.fn());

describe("로또 구입 금액을 입력받는다.", () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("로또를 구매할 금액을 입력받는다", async () => {
    const mockInput = "1000";
    const lottoSalesView = new LottoSalesView();

    readLineAsync.mockResolvedValueOnce(mockInput);
    const purchaseAmount = await lottoSalesView.inputPurchaseAmount();

    expect(purchaseAmount).toBe(1000);
  });

  it("로또를 구매할 금액이 숫자가 아닌 경우 에러가 발생한다.", async () => {
    const mockInput = ["a", "bbb", "1000"];
    const lottoSalesView = new LottoSalesView();

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoSalesView.inputPurchaseAmount();

    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  it("로또를 구매할 금액이 0보다 작은 경우 에러가 발생한다.", async () => {
    const mockInput = ["-1", "1000", "1000"];
    const lottoSalesView = new LottoSalesView();

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoSalesView.inputPurchaseAmount();

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
