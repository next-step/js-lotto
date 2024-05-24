import { lottoMoneyRule } from "../src/js/rules";
import { bonusNumberRule, lottoRule } from "../src/js/rules/Lotto.rule";
import { LOTTO_MONEY_ERR_MSG, LOTTO_NUMBER_DUPLICATED_ERR_MSG } from "../src/js/constants/error";
import {
  TEST_DUPLICATED_BONUS_NUMBER,
  TEST_DUPLICATED_LOTTO_NUMBERS,
  TEST_LOTTO_NUMBERS,
  TEST_STRING_MONEY,
  TEST_WHITESPACE_MONEY,
} from "./constants";
import { Lotto } from "../src/js/domain/Lotto";

let logSpy;
beforeEach(() => {
  logSpy = jest.spyOn(console, "log");
});

describe("입력 테스트", () => {
  test("입금액이 공백일 경우, 에러 메시지를 반환한다.", async () => {
    //given
    const mockMoney = jest.fn().mockReturnValue(TEST_WHITESPACE_MONEY);
    const input = await mockMoney();

    //when
    const validationCallback = () => lottoMoneyRule.validates(input);

    //then
    expect(validationCallback).toThrow(LOTTO_MONEY_ERR_MSG);
  });

  test("입금액이 문자열일 경우, 에러 메시지를 반환한다.", async () => {
    //given
    const mockMoney = jest.fn().mockReturnValue(TEST_STRING_MONEY);
    const input = await mockMoney();

    //when
    const validationCallback = () => lottoMoneyRule.validates(input);

    //then
    expect(validationCallback).toThrow(LOTTO_MONEY_ERR_MSG);
  });

  test("입금액이 0 미만일 경우, 에러 메시지를 반환한다.", async () => {
    //given
    const mockMoney = jest.fn().mockReturnValue(TEST_STRING_MONEY);
    const input = await mockMoney();

    //when
    const validationCallback = () => lottoMoneyRule.validates(input);

    //then
    expect(validationCallback).toThrow(LOTTO_MONEY_ERR_MSG);
  });

  test("당첨 번호가 중복되었다면, 에러메시지를 호출한다.", async () => {
    //given
    const mockWinningNumbers = jest.fn().mockReturnValue(TEST_DUPLICATED_LOTTO_NUMBERS);
    const input = await mockWinningNumbers();

    //when
    const validationCallback = () => lottoRule.validates(input);

    //then
    expect(validationCallback).toThrow(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
  });

  test("보너스 번호가 당첨 번호와 중복되었다면, 에러메시지를 호출한다.", async () => {
    //given
    const mockWinningNumbers = jest.fn().mockReturnValue(TEST_LOTTO_NUMBERS);
    const mockBonusNumber = jest.fn().mockReturnValue(TEST_DUPLICATED_BONUS_NUMBER);
    const input_winningNumbers = new Lotto(await mockWinningNumbers());
    const input_bonusNumber = await mockBonusNumber();

    //when
    const validationCallback = () =>
      bonusNumberRule.validates(input_bonusNumber, input_winningNumbers);

    //then
    expect(validationCallback).toThrow(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
  });
});
