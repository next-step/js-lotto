import { Lotto, WinningLotto } from "../src/js/domain/index.js";
import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../src/js/constants";
import {
  TEST_DUPLICATED_BONUS_NUMBER,
  TEST_DUPLICATED_LOTTO,
  TEST_INVALID_BONUS_NUMBER_RANGE,
  TEST_INVALID_LOTTO_LENGTH,
  TEST_INVALID_LOTTO_RANGE,
  TEST_LOTTO,
  TEST_LOTTO_STRINGS,
  TEST_STRING_BONUS_NUMBER,
} from "./constants/index.js";
import {
  LOTTO_NUMBER_DUPLICATED_ERR_MSG,
  LOTTO_NUMBER_LENGTH_ERR_MSG,
  LOTTO_NUMBER_RANGE_ERR_MSG,
  LOTTO_NUMBER_TYPE_ERR_MSG,
} from "../src/js/constants/error.js";

let lotto;
beforeEach(() => {
  lotto = new Lotto(TEST_LOTTO);
});

describe("로또 정보 테스트", () => {
  test("하나의 로또는 6개의 정수를 갖는다.", () => {
    // when
    const lottoLength = lotto.numbers.length;

    // then
    expect(lottoLength).toBe(LOTTO_LENGTH);
  });

  test("로또의 숫자는 1부터 45까지의 정수이다.", () => {
    // when
    const numbers = lotto.numbers;

    // then
    expect(
      numbers.every((number) => MINIMUM_LOTTO_NUMBER <= number && number <= MAXIMUM_LOTTO_NUMBER)
    ).toBe(true);
  });

  test("로또는 오름차순으로 정렬된 숫자를 갖고 있다.", () => {
    //given
    const isSorted = (arr) => arr.every((v, i) => !i || arr[i - 1] <= v);

    //when
    const numbers = lotto.numbers;
    const numbersSorted = isSorted(numbers);

    //then
    expect(numbersSorted).toBe(true);
  });

  test.each([
    {
      lottoNumbers: TEST_LOTTO_STRINGS,
      errMsg: LOTTO_NUMBER_TYPE_ERR_MSG,
      description: "로또 번호가 문자라면, 에러메시지를 호출한다.",
    },
    {
      lottoNumbers: TEST_DUPLICATED_LOTTO,
      errMsg: LOTTO_NUMBER_DUPLICATED_ERR_MSG,
      description: "로또 번호가 중복되었다면, 에러메시지를 호출한다.",
    },
    {
      lottoNumbers: TEST_INVALID_LOTTO_LENGTH,
      errMsg: LOTTO_NUMBER_LENGTH_ERR_MSG,
      description: "로또 번호가 6개가 아니라면, 에러메시지를 호출한다.",
    },
    {
      lottoNumbers: TEST_INVALID_LOTTO_RANGE,
      errMsg: LOTTO_NUMBER_RANGE_ERR_MSG,
      description: "로또 번호가 1 ~ 45의 숫자가 아니라면, 에러메시지를 호출한다.",
    },
  ])(`$description`, ({ lottoNumbers, errMsg }) => {
    //given
    const input = lottoNumbers;

    //when
    const generateLotto = () => new Lotto(input);

    //then
    expect(generateLotto).toThrow(errMsg);
  });

  test.each([
    {
      bonusNumber: TEST_INVALID_BONUS_NUMBER_RANGE,
      errMsg: LOTTO_NUMBER_RANGE_ERR_MSG,
      description: "로또 번호가 1 ~ 45의 숫자가 아니라면, 에러메시지를 호출한다.",
    },
    {
      bonusNumber: TEST_STRING_BONUS_NUMBER,
      errMsg: LOTTO_NUMBER_TYPE_ERR_MSG,
      description: "로또 번호가 문자라면, 에러메시지를 호출한다.",
    },
    {
      bonusNumber: TEST_DUPLICATED_BONUS_NUMBER,
      errMsg: LOTTO_NUMBER_DUPLICATED_ERR_MSG,
      description: "보너스 번호가 당첨 번호와 중복되었다면, 에러메시지를 호출한다.",
    }
  ])(`$description`, async ({ bonusNumber, errMsg }) => {
    //given
    const mockWinningNumbers = jest.fn().mockReturnValue(TEST_LOTTO);
    const input_winningNumbers = new Lotto(await mockWinningNumbers());

    //when
    const generateWinningLotto = () => new WinningLotto(input_winningNumbers, bonusNumber);

    //then
    expect(generateWinningLotto).toThrow(errMsg);
  });
});
