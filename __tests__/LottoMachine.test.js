import { LOTTO_PLAYABLE_STATE_ERR_MSG } from "../src/js/constants/error";
import { LottoMachine } from "../src/js/domain/index";
import { TEST_INVALIDE_LOTTO_PLAYABLE_STATE, TEST_MONEY } from "./constants";

let lottoMachine;
beforeEach(() => {
  lottoMachine = new LottoMachine();
});

describe("로또 기계 테스트", () => {
  test("입금액에 따라 로또를 발행한다.", () => {
    //when
    const lottoCounts = lottoMachine.countTheNumberOfLottos(TEST_MONEY);

    //then
    expect(lottoCounts).toBe(8);
  });

  test("'y' 또는 'n' 을 제외한 다른 대답을 받을 경우, 에러메시지를 호출한다.", async () => {
    //when
    const mockPlayableStatus = jest.fn().mockReturnValue(TEST_INVALIDE_LOTTO_PLAYABLE_STATE);
    const input = await mockPlayableStatus();

    //given
    const updatePlayableState = () => lottoMachine.updatePlayableState(input);

    //then
    expect(updatePlayableState).toThrow(LOTTO_PLAYABLE_STATE_ERR_MSG);
  });
});
