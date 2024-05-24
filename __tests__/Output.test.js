import { Output } from "../src/js/view";
import { LottoMachine } from "../src/js/domain";
import {
  TEST_LOTTOS_RESULT,
  TEST_LOTTOS_RESULT_OUTPUT,
  TEST_LOTTOS_RETURN,
  TEST_LOTTO_NUMBERS,
  TEST_MONEY,
} from "./constants";

let logSpy;
beforeEach(() => {
  logSpy = jest.spyOn(console, "log");
});
describe("출력 테스트", () => {
  test("구매 로또 개수를 출력한다.", async () => {
    //given
    const mockMoney = jest.fn().mockReturnValue(TEST_MONEY);
    const input = await mockMoney();
    const theNumberOfLottos = input / LottoMachine.LOTTO_PRICE;

    //when
    Output.printTheNumberOfLottos(theNumberOfLottos);

    //then
    expect(logSpy).toHaveBeenCalledWith(`${theNumberOfLottos}개를 구매했습니다.`);
  });

  test("구매 로또 번호를 출력한다.", async () => {
    //given
    const ascLottoArr = { numbers: TEST_LOTTO_NUMBERS.sort((a, b) => a - b) };

    //when
    Output.printLottoNumbers(ascLottoArr);

    //then
    expect(logSpy).toHaveBeenCalledWith(ascLottoArr.numbers);
  });

  test("로또 당첨 통계를 출력한다.", () => {
    //when
    Output.printLottoResult(TEST_LOTTOS_RESULT);

    //then
    TEST_LOTTOS_RESULT_OUTPUT.forEach((result) => {
      expect(logSpy).toHaveBeenCalledWith(result);
    });
  });

  test("로또 수익률을 출력한다.", () => {
    //when
    Output.printLottoReturn(TEST_LOTTOS_RETURN);

    //then
    expect(logSpy).toHaveBeenCalledWith(`총 수익률은 ${TEST_LOTTOS_RETURN.toFixed(2)}% 입니다.`);
  });
});
