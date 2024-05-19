import { ERROR_MESSAGE_INPUT_NUMBER } from '../src/constants';
import LottoConfirm from '../src/domain/LottoConfirm';
import LottoMachine from '../src/domain/LottoMachine';
import LottoIO from '../src/view/LottoIO';
import { sortArray } from '../src/utils';

describe('로또 입출력에 관한 테스트 케이스', () => {
  test('구매 금액을 입력받는다.', async () => {
    //given
    const lottoIO = new LottoIO();

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const purchasePrice = await lottoIO.inputPurchasePrice(1);

    //then
    expect(purchasePrice).toBe(7000);
  });

  test('구매 금액을 잘못입력한 경우(숫자 이외 다른 문자), 에러를 발생시킨다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000ㅁㅁㅁ');
    await lottoIO.inputPurchasePrice(1);
    //then
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE_INPUT_NUMBER);
  });

  test('구매한 로또에 대한 번호를 출력한다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();

    const GENERATED_LOTTO_NUMBERS = [1, 2, 3, 41, 13, 14];
    const EXPECTED_LOTTOS = Array(7).fill(GENERATED_LOTTO_NUMBERS);

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const prices = await lottoIO.inputPurchasePrice(1);

    machine.generateLottoNumbers = jest.fn().mockReturnValue(GENERATED_LOTTO_NUMBERS);
    const lottos = machine.createLottos(prices, 'ASC', sortArray);

    console.log('lottos', lottos);

    lottoIO.outputPurchasedLottos(lottos);

    expect(EXPECTED_LOTTOS).toEqual(lottos);
  });

  test('구매한 로또 금액 대비, 수익률을 알 수 있다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();
    const lottoConfirm = new LottoConfirm();
    const GENERATED_LOTTO_NUMBERS = [1, 2, 3, 41, 13, 14];

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const prices = await lottoIO.inputPurchasePrice(1);

    machine.generateLottoNumbers = jest.fn().mockReturnValue(GENERATED_LOTTO_NUMBERS);
    const lottos = machine.createLottos(prices, 'ASC', sortArray);

    lottoConfirm.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    lottoConfirm.setBonusNumber(43);

    const checkedLottos = lottoConfirm.checkLottoWinning(lottos);

    lottoIO.outputPurchasedLottos(checkedLottos);

    const percent = lottoConfirm.returnsLottos(prices, checkedLottos);

    //then
    expect(percent).toBe(500);
  });

  test('로또 번호는 오름차순으로 정렬하여 보여준다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();
    const GENERATED_LOTTO_NUMBERS = [12, 32, 3, 41, 13, 14];
    const EXPECT_LOTTO_NUMBERS = [3, 12, 13, 14, 32, 41];

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('1000');
    const prices = await lottoIO.inputPurchasePrice();

    machine.generateLottoNumbers = jest.fn().mockReturnValue(GENERATED_LOTTO_NUMBERS);
    const lottos = machine.createLottos(prices, 'ASC', sortArray);

    expect(EXPECT_LOTTO_NUMBERS).toEqual(lottos[0]);
  });

  test('당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();
    const lottoConfirm = new LottoConfirm();
    const GENERATED_LOTTO_NUMBERS = [1, 2, 3, 41, 13, 14];

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const prices = await lottoIO.inputPurchasePrice();

    machine.generateLottoNumbers = jest.fn().mockReturnValue(GENERATED_LOTTO_NUMBERS);
    const lottos = machine.createLottos(prices, 'ASC', sortArray);

    lottoConfirm.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    lottoConfirm.setBonusNumber(43);

    const checkedLottos = lottoConfirm.checkLottoWinning(lottos);
    lottoIO.outputPurchasedLottos(checkedLottos);
    const percent = lottoConfirm.returnsLottos(prices, checkedLottos);
    lottoIO.outputLottosResult(checkedLottos, percent);

    lottoIO.readLineAsync = jest.fn().mockResolvedValue('y');
    const restart = await lottoIO.inputRestartOrNot(1);

    //then
    expect(restart).toBe('y');
  });
});
