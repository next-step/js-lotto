import { LOTTO_MONEY_ERR_MSG, LOTTO_PLAYABLE_STATE_ERR_MSG } from "../src/js/constants/error";
import { Lotto, LottoMachine, RandomNumbersGenerator, WinningLotto } from "../src/js/domain/index";
import { TEST_INVALIDE_LOTTO_PLAYABLE_STATE } from "./constants";

let lottoMachine;
beforeEach(() => {
  lottoMachine = new LottoMachine();
});

describe("로또 기계 테스트", () => {
  test("입금액이 0이상의 숫자가 아니라면 에러 메시지를 호출한다.", () => {
    //when
    const validatesMoney = () => lottoMachine.validates("8000");

    //then
    expect(validatesMoney).toThrow(LOTTO_MONEY_ERR_MSG);
  });

  test.each([
    { money: 0, count: 0 },
    { money: 1_000, count: 1 },
    { money: 3_500, count: 3 },
    { money: 8_000, count: 8 },
  ])("입금액에 따라 로또를 발행한다.", ({ money, count }) => {
    //when
    const lottos = lottoMachine.buy(money);

    //then
    expect(lottos.length).toBe(count);
  });

  test("랜덤으로 생성한 로또는 1 ~ 45 사이의 중복되지 않는 6 가지 정수를 갖는다.", () => {
    //given
    const generator = new RandomNumbersGenerator();

    //when
    const numbers = generator.generateRandomNumbers();

    //then
    expect(numbers).toHaveLength(6);
    expect(new Set(numbers).size).toBe(6);
    numbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test("당첨 번호를 생성한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    //when
    const winningLotto = lottoMachine.generateWinningLotto(new Lotto(winningNumbers), bonusNumber);

    //then
    expect(winningLotto).toBeInstanceOf(WinningLotto);
  });

  test("재시작 여부를 변경한다.", () => {
    //given
    const playable = lottoMachine.playable;

    //when
    lottoMachine.updatePlayableState("n");
    const updatedPlayable = lottoMachine.playable;

    //then
    expect(playable).toBe(true);
    expect(updatedPlayable).toBe(false);
  });

  test("'y' 또는 'n' 을 제외한 다른 대답을 받을 경우, 에러메시지를 호출한다.", async () => {
    //given
    const mockPlayableStatus = jest.fn().mockReturnValue(TEST_INVALIDE_LOTTO_PLAYABLE_STATE);
    const input = await mockPlayableStatus();

    //when
    const updatePlayableState = () => lottoMachine.updatePlayableState(input);

    //then
    expect(updatePlayableState).toThrow(LOTTO_PLAYABLE_STATE_ERR_MSG);
  });
});
