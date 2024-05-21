import LottoMachine, {
  ERROR_MESSAGE_LACK_MONEY,
  ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER,
  ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS,

} from '../src/domain/LottoMachine';
import { sortArray } from '../src/utils';


describe("로또 머신에 대한 테스트 케이스", () => {
  test("금액에 해당하는 만큼 로또를 발행한다.", () => {
    //given
    const machine = new LottoMachine();

    //when

    machine.createLottos(7000, "ASC", sortArray);
    const lottos = machine.getLottos();


    //then
    expect(lottos.length).toBe(7);
  });

  test("로또 1장의 가격은 1000원이다. 금액이 작을 경우 예외처리 발생", () => {
    //given
    const machine = new LottoMachine();

    //when

    //then
    expect(() => {
      machine.createLottos(700);
    }).toThrow(ERROR_MESSAGE_LACK_MONEY);
  });

  test("로또기계는 당첨번호와 보너스 번호를 입력받아야된다.", () => {
    //given
    const machine = new LottoMachine();

    //when
    machine.bonusNumber = 7;
    machine.winnigNumbers = [1, 2, 3, 4, 5, 6];

    //then
    expect(machine.bonusNumber).toBe(7);
    expect([1, 2, 3, 4, 5, 6]).toEqual(machine.winnigNumbers);
  });

  test("우승번호를 입력하지 않으면 통계를 낼 수 없다.", () => {
    //given
    const machine = new LottoMachine();

    //when

    machine.createLottos(7000, "ASC", sortArray);
    const lottos = machine.getLottos();

    machine.bonusNumber = 7;

    //then
    expect(() => {
      machine.checkLottoWinning(lottos);
    }).toThrow(ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS);
  });

  test("보너스 번호를 입력하지 않으면 통계를 낼 수 없다.", () => {
    //given
    const machine = new LottoMachine();

    //when

    machine.createLottos(7000, "ASC", sortArray);
    const lottos = machine.getLottos();


    //then
    expect(() => {
      machine.checkLottoWinning(lottos);
    }).toThrow(ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER);
  });
});
