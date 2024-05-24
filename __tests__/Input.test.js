import { lottoMoneyRule } from "../src/js/rules";
import { LOTTO_MONEY_ERR_MSG } from "../src/js/constants/error";
import { TEST_STRING_MONEY, TEST_WHITESPACE_MONEY } from "./constants";

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
});
