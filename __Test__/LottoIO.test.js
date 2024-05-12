import LottoMachine from '../src/domain/LottoMachine';
import { generateRandomNumbers } from '../src/utils';
import LottoIO, { ERROR_MESSAGE_INPUT_PURCHASE_PRICE } from '../src/view/\bLottoIO';

describe('로또 입출력에 관한 테스트 케이스', () => {
  test('구매 금액을 입력받는다.', async () => {
    //given
    const lottoIO = new LottoIO();

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const purchasePrice = await lottoIO.inputPurchasePrice();

    //then
    expect(purchasePrice).toBe(7000);
  });

  test('구매 금액을 잘못입력한 경우(숫자 이외 다른 문자), 에러를 발생시킨다.', async () => {
    //given
    const lottoIO = new LottoIO();

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000ㅁㅁㅁ');

    //then
    await expect(lottoIO.inputPurchasePrice()).rejects.toThrow(
      ERROR_MESSAGE_INPUT_PURCHASE_PRICE
    );
  });

  test('구매한 로또에 대한 번호를 출력한다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const prices = await lottoIO.inputPurchasePrice();

    machine.generateLottoNumbers = jest.fn().mockReturnValue([1, 2, 3, 41, 13, 14]);
    const lottos = machine.createLottos(prices);

    machine.winnigNumbers = [1, 2, 3, 4, 5, 6];
    machine.bonusNumber = 43;

    const checkedLottos = machine.checkLottoWinning(lottos);
    lottoIO.outputPurchasedLottos(checkedLottos);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('3개 일치 (5,000원) - 7개')
    );
  });

  test('구매한 로또 금액 대비, 수익률을 알 수 있다.', async () => {
    //given
    const lottoIO = new LottoIO();
    const machine = new LottoMachine();
    const logSpy = jest.spyOn(global.console, 'log');

    //when
    lottoIO.readLineAsync = jest.fn().mockResolvedValue('7000');
    const prices = await lottoIO.inputPurchasePrice();

    machine.generateLottoNumbers = jest.fn().mockReturnValue([1, 2, 3, 41, 13, 14]);
    const lottos = machine.createLottos(prices);

    machine.winnigNumbers = [1, 2, 3, 4, 5, 6];
    machine.bonusNumber = 43;

    const checkedLottos = machine.checkLottoWinning(lottos);
    lottoIO.outputPurchasedLottos(checkedLottos);

    const percent = machine.returnsLottos(prices, checkedLottos);

    expect(percent).toBe(500);
  });
});
