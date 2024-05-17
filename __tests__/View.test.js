import LottoMachine from "../src/js/domain/LottoMachine";
import View from "../src/js/domain/View";
import { lottoMoneyRule } from "../src/js/rules";
import { LOTTO_MONEY_ERR_MSG, LOTTO_NUMBER_DUPLICATED_ERR_MSG } from "../src/js/constants/error";
import {
  TEST_DUPLICATED_BONUS_NUMBER,
  TEST_DUPLICATED_LOTTO_NUMBERS,
  TEST_LOTTOS,
  TEST_LOTTOS_RESULT,
  TEST_LOTTO_NUMBERS,
  TEST_MONEY,
  TEST_STRING_MONEY,
  TEST_WHITESPACE_MONEY,
} from "./constants";
import { Lotto, WinningLotto } from "../src/js/domain/Lotto";
import { bonusNumberRule, lottoRule } from "../src/js/rules/Lotto.rule";
import { LottoRank } from "../src/js/domain/LottoRank";

let logSpy;
let lotto;
let lottoMachine;
beforeEach(() => {
  logSpy = jest.spyOn(console, "log");
  lotto = new Lotto(TEST_LOTTO_NUMBERS);
  lottoMachine = new LottoMachine();
});

describe("입출력 테스트", () => {
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

  test("구매 로또 개수를 출력한다.", async () => {
    //given
    const mockMoney = jest.fn().mockReturnValue(TEST_MONEY);
    const input = await mockMoney();
    const theNumberOfLottos = lottoMachine.getTheNumberOfLottos(input);

    //when
    lottoMachine.buy(input);

    //then
    expect(logSpy).toHaveBeenCalledWith(`${theNumberOfLottos}개를 구매했습니다.`);
  });

  test("구매 로또 번호를 출력한다.", async () => {
    //given
    const mockLottoNumbers = jest.fn().mockReturnValue(TEST_LOTTO_NUMBERS);
    const mockLotto = new Lotto(mockLottoNumbers());
    const ascLottoArr = TEST_LOTTO_NUMBERS.sort((a, b) => a - b);

    //when
    View.printLottoNumbers(mockLotto);

    //then
    expect(logSpy).toHaveBeenCalledWith(ascLottoArr);
  });

  test("당첨 번호가 중복되었다면, 에러메시지를 호출한다.", async () => {
    //given
    const mockWinningNumbers = jest.fn().mockReturnValue(TEST_DUPLICATED_LOTTO_NUMBERS);
    const input = await mockWinningNumbers();

    //when
    const validationCallback = () => lottoRule.validates(input.join(","));

    //then
    expect(validationCallback).toThrow(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
  });

  test("보너스 번호가 당첨 번호와 중복되었다면, 에러메시지를 호출한다.", async () => {
    //given
    const mockWinningNumbers = jest.fn().mockReturnValue(TEST_LOTTO_NUMBERS);
    const mockBonusNumber = jest.fn().mockReturnValue(TEST_DUPLICATED_BONUS_NUMBER);
    const input_winningNumbers = await mockWinningNumbers();
    const input_bonusNumber = await mockBonusNumber();

    //when
    const validationCallback = () =>
      bonusNumberRule.validates(String(input_bonusNumber), input_winningNumbers);

    //then
    expect(validationCallback).toThrow(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
  });

  test("로또 당첨 통계를 출력한다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([15, 23, 12, 1, 34, 26]), 7);
    const testLottos = TEST_LOTTOS.map((lotto) => new Lotto(lotto));

    const lottoRanks = testLottos.map((lotto) => lotto.getRank(winningLotto));
    const lottoRankCounts = lottoMachine.countLottoRanks(lottoRanks);

    //when
    View.printLottoResult(lottoRankCounts);

    //then
    TEST_LOTTOS_RESULT.forEach((result) => {
      expect(logSpy).toHaveBeenCalledWith(result);
    });
  });

  test("로또 수익률을 출력한다.", () => {
    //given
    const winningLotto = new WinningLotto(new Lotto([15, 23, 12, 1, 34, 26]), 7);
    const testLottos = TEST_LOTTOS.map((lotto) => new Lotto(lotto));

    const lottoRanks = testLottos.map((lotto) => lotto.getRank(winningLotto));
    const lottoRankCounts = lottoMachine.countLottoRanks(lottoRanks);
    const lottoReturn = LottoRank.getLottoReturn(lottoRankCounts);

    //when
    View.printLottoReturn(lottoRankCounts);

    //then
    expect(logSpy).toHaveBeenCalledWith(`총 수익률은 ${lottoReturn.toFixed(2)}% 입니다.`);
  });
});
