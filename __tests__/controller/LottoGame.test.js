import LottoGame from '../../src/js/controller/LottoGame.js';
import LottoMachine from '../../src/js/domain/LottoMachine.js';
import Lotto from '../../src/js/domain/Lotto.js';
import {
  DEFAULT_LOTTO_NUMBERS,
  INVALID_MONEY,
  INVALID_QUANTITY_WINNING_NUMBERS,
  INVALID_RANGE_BONUS,
  INVALID_RANGE_WINNING_NUMBERS,
  INVALID_RETRY_CODE,
  LOTTO_REWARD_DUMMY,
  MATCHED_BONUS,
  MOCKED_BONUS,
  MOCKED_MONEY,
  MOCKED_RETRY_CODE,
  MOCKED_WINNING_NUMBERS,
  VALID_BONUS,
  VALID_MONEY,
  VALID_WINNING_NUMBERS,
} from '../constants/lotto.js';
import {
  LOTTO_NUMBER_QUANTITY,
  LOTTO_NUMBER_RANGE,
  LOTTO_RETRY_CODE,
  LOTTO_REWARD_CODE,
} from '../../src/js/constants/lotto-config.js';
import ERROR from '../../src/js/constants/error.js';
import mockInput from './utils/mockInput.js';

jest.mock('../../src/js/view/Lotto/LottoInputView.js');
jest.mock('../../src/js/domain/LottoMachine.js');

const logSpy = jest.spyOn(console, 'log');
let logIndex = 0;

const errorSpy = jest.spyOn(console, 'error');
let errorIndex = 0;

describe.skip('로또 구매 과정 테스트', () => {
  let lottoGame;

  beforeAll(() => {
    mockInput({
      purchase: MOCKED_MONEY,
      winningNumbers: MOCKED_WINNING_NUMBERS,
      bonus: MOCKED_BONUS,
      retry: MOCKED_RETRY_CODE,
    });
    LottoMachine.prototype.buy.mockReturnValue([new Lotto(DEFAULT_LOTTO_NUMBERS)]);
    lottoGame = new LottoGame();
    lottoGame.start();
    process.exit = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    logIndex = 0;
    errorIndex = 0;
  });

  it('단위에 맞지 않는 금액을 입력할 시 에러가 발생되며 재입력받는다.', () => {
    INVALID_MONEY.forEach(() => {
      expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
    });
  });

  it('로또를 1,000원에 한 장 구매한다', async () => {
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '1개를 구매했습니다.');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), DEFAULT_LOTTO_NUMBERS);
    expect(lottoGame.recentPurchaseMoney).toBe(1000);
    expect(lottoGame.recentLottos).toEqual([new Lotto(DEFAULT_LOTTO_NUMBERS)]);
    expect(lottoGame.recentLottos.length).toBe(1);
  });

  it(`${LOTTO_NUMBER_QUANTITY}개가 아닌 당첨 번호를 입력할 시 에러가 발생되며 재입력받는다.`, () => {
    INVALID_QUANTITY_WINNING_NUMBERS.forEach(() => {
      expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.WINNING_NUMBERS.UNMATCHED_QUANTITY);
    });
  });

  it(`${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위 내가 아닌 당첨 번호를 입력할 시 에러가 발생되며 재입력받는다.`, () => {
    INVALID_RANGE_WINNING_NUMBERS.forEach(() => {
      expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.NUMBER.BEYOND_NUMBER_RANGE);
    });
  });

  it('중복된 번호가 존재하는 당첨 번호를 입력할 시 에러가 발생되며 재입력받는다.', () => {
    expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.WINNING_NUMBERS.DO_NOT_ENTER_DUPLICATED_NUMBER);
  });

  it('당첨번호를 입력한다', async () => {
    expect(lottoGame.winningNumbers).toEqual(LOTTO_REWARD_DUMMY.SECOND);
  });

  it('당첨번호와 중복된 보너스 번호를 입력할 시 에러가 발생되며 재입력받는다.', () => {
    expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.BONUS.DUPLICATED_WITH_WINNING_NUMBER);
  });

  it(`${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 범위 내가 아닌 보너스 번호를 입력할 시 에러가 발생되며 재입력받는다.`, () => {
    INVALID_RANGE_BONUS.forEach(() => {
      expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.NUMBER.BEYOND_NUMBER_RANGE);
    });
  });

  it('보너스번호를 입력한다', async () => {
    expect(lottoGame.bonus).toBe(MATCHED_BONUS);
  });

  it('당첨 결과를 확인한다.', async () => {
    expect(lottoGame.result).toEqual({
      [LOTTO_REWARD_CODE.FIRST]: 0,
      [LOTTO_REWARD_CODE.SECOND]: 1,
      [LOTTO_REWARD_CODE.THIRD]: 0,
      [LOTTO_REWARD_CODE.FOURTH]: 0,
      [LOTTO_REWARD_CODE.FIFTH]: 0,
    });

    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '당첨 통계');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '--------------------');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '3개 일치 (5,000원) - 0개');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '4개 일치 (50,000원) - 0개');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '5개 일치 (1,500,000원) - 0개');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '5개 일치, 보너스 볼 일치 (30,000,000원) - 1개');
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '6개 일치 (2,000,000,000원) - 0개');
  });

  it('전체 상금을 설정한다.', async () => {
    expect(lottoGame.totalPrize).toBe(30000000);
  });

  it('수익률을 확인한다.', async () => {
    expect(lottoGame.rateOfReturn).toBe(3000000);
    expect(logSpy).toHaveBeenNthCalledWith((logIndex += 1), '총 수익률은 3,000,000%입니다.');
  });

  it(`${LOTTO_RETRY_CODE.CONFIRM}나 ${LOTTO_RETRY_CODE.REJECT}가 아닌 값을 입력할 시 에러가 발생되며 재입력받는다.`, async () => {
    INVALID_RETRY_CODE.forEach(() => {
      expect(errorSpy).toHaveBeenNthCalledWith((errorIndex += 1), ERROR.RETRY.INVALID_CODE);
    });
  });

  it('게임을 종료한다.', async () => {
    expect(process.exit).toHaveBeenCalled();
  });
});

describe.skip('재시작 테스트', () => {
  let lottoGame;
  let retryGameSpy;

  beforeAll(() => {
    mockInput({
      purchase: [VALID_MONEY],
      winningNumbers: [VALID_WINNING_NUMBERS],
      bonus: [VALID_BONUS],
      retry: [LOTTO_RETRY_CODE.CONFIRM],
    });

    LottoMachine.prototype.buy.mockReturnValue([new Lotto(DEFAULT_LOTTO_NUMBERS)]);
    lottoGame = new LottoGame();

    lottoGame.retryGame = jest.fn();
    lottoGame.retryGame.mockImplementation(() => {
      process.exit();
    });

    retryGameSpy = jest.spyOn(lottoGame, 'retryGame');
    retryGameSpy.mockClear();

    lottoGame.start();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('y를 누를시 게임을 재시작한다.', () => {
    expect(retryGameSpy).toHaveBeenCalled();
  });
});
