import { Input } from "../src/js/view/Input";
import { readLineAsync } from "../src/js/utils/readLineSync";

let logSpy;

jest.mock('../src/js/utils/readLineSync', () => ({
  readLineAsync: jest.fn()
}));

beforeEach(() => {
  logSpy = jest.spyOn(console, "log");
  jest.clearAllMocks();
});

describe("입력 테스트", () => {
  test.each([
    {
      input: "8000",
      output: 8_000,
      prompt: "> 구입금액을 입력해 주세요.\n",
      fn: Input.getMoney,
      description: "구입 금액을 입력받는다."
    },
    {
      input: "1,2,3,4,5,6",
      output: [1,2,3,4,5,6],
      prompt: `> 당첨 번호를 입력해 주세요.`,
      fn: Input.getWinningNumbers,
      description: "당첨 번호를 입력받는다."
    },
    {
      input: "7",
      output: 7,
      prompt: `> 보너스 번호를 입력해 주세요.`,
      fn: Input.getBonusNumber,
      description: "보너스 번호를 입력받는다."
    },
    {
      input: "y",
      output: "y",
      prompt: `> 다시 시작하시겠습니까? (y/n)\n`,
      fn: Input.getPlayAgain,
      description: "게임 재시작 여부를 입력받는다."
    },
  ])(`$description`, async({ input, output, prompt, fn }) => {
    //given
    readLineAsync.mockResolvedValue(input);

    //when
    const result = await fn();

    //then
    expect(readLineAsync).toHaveBeenCalledWith(prompt);
    expect(result).toStrictEqual(output);
  });
});
