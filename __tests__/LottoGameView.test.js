import LottoGameView from "../src/js/domain/lotto-game/lotto-game.view.js";
import readLineAsync from "../src/js/utils/readLineAsync.js";

jest.mock("../src/js/utils/readLineAsync.js", () => jest.fn());

describe("당첨 번호를 입력받는다.", () => {
  let errorSpy;
  const lottoGameView = new LottoGameView();

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("당첨 번호 6개를 입력받는다.", async () => {
    const mockInput = "1, 2, 3, 4, 5, 6";

    readLineAsync.mockResolvedValueOnce(mockInput);

    const winningNumbers = await lottoGameView.inputWinningNumbers();

    expect(winningNumbers).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  it("당첨 번호가 숫자가 아닌 경우 에러가 발생한다.", async () => {
    const mockInput = ["1, 2, 3, 4, 5, a", "1, 2, 3, 4, 5, 6"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });

    await lottoGameView.inputWinningNumbers();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("당범 번호가 6개가 아닌 경우 에러가 발생한다.", async () => {
    const mockInput = [
      "1, 2, 3, 4, 5",
      "1, 2, 3, 4, 5, 6, 7",
      "1, 2, 3, 4, 5, 6",
    ];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputWinningNumbers();

    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  it("당첨 번호가 중복된 경우 에러가 발생한다.", async () => {
    const mockInput = ["1, 1, 2, 3, 4, 5", "1, 2, 3, 4, 5, 6"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputWinningNumbers();

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("당첨 번호가 범위를 벗어난 경우 에러가 발생한다.", async () => {
    const mockInput = ["0, 1, 2, 3, 4, 5", "1, 2, 3, 4, 5, 6"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputWinningNumbers();

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("당첨 번호가 정수가 아닐 경우 에러가 발생한다.", async () => {
    const mockInput = ["1.1, 2, 3, 4, 5, 6", "1, 2, 3, 4, 5, 6"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputWinningNumbers();

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});

describe("보너스 번호를 입력받는다.", () => {
  let errorSpy;
  const lottoGameView = new LottoGameView();
  const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("보너스 번호를 입력받는다.", async () => {
    const mockInput = "8";
    readLineAsync.mockResolvedValueOnce(mockInput);

    const bonusNumber = await lottoGameView.inputBonusNumber(WINNING_NUMBERS);
    expect(bonusNumber).toBe(8);
  });

  it("보너스 번호가 정수가 아닌 경우 에러가 발생한다.", async () => {
    const mockInput = ["a", "1.1", "8"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputBonusNumber(WINNING_NUMBERS);

    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  it("보너스 번호가 범위를 벗어난 경우 에러가 발생한다.", async () => {
    const mockInput = ["0", "8"];

    mockInput.forEach((input) => {
      readLineAsync.mockResolvedValueOnce(input);
    });
    await lottoGameView.inputBonusNumber(WINNING_NUMBERS);

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
