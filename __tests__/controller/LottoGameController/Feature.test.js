import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../../../src/step1/constants/message';
import { InputView, OutputView } from '../../../src/step1/view';
import { mockCreateLottoNumbers, mockInputView, runLottoGameController } from './util';

jest.mock('../../../src/step1/view/outputView.js');

describe('LottoGameController 관련 기능 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('게임이 시작되면 구매 금액을 입력하라는 메시지가 출력되어야 한다.', async () => {
    // given
    mockInputView();

    // when
    await runLottoGameController();

    // then
    const startMessageLog = jest.spyOn(InputView, 'inputByUser').mock.calls.at(0).join();
    expect(startMessageLog).toMatch(INPUT_MESSAGE.BUY_AMOUNT);
  });

  test.each([
    {
      input: {
        investmentAmount: '1000',
      },
      expected: OUTPUT_MESSAGE.BUY_COUNT(1),
    },
    {
      input: {
        investmentAmount: '8000',
      },
      expected: OUTPUT_MESSAGE.BUY_COUNT(8),
    },
  ])(
    '구매금액이 $input.investmentAmount원 일 때 "$expected"가 출력되어야 한다.',
    async ({ input: { investmentAmount }, expected }) => {
      // given
      mockInputView({ investmentAmount });
      // when
      await runLottoGameController();
      // then
      const buyMessageLog = jest.spyOn(OutputView, 'printFor').mock.calls.at(0).join();
      expect(buyMessageLog).toMatch(expected);
    },
  );

  test('로또 생성 후 당첨 번호 및 보너스 번호를 입력하라는 메시지가 출력되어야 한다.', async () => {
    // given
    mockInputView();
    // when
    await runLottoGameController();
    // then
    const [winningLottoMessage, bonusNumberMessage] = jest
      .spyOn(InputView, 'inputByUser')
      .mock.calls.slice(1, 3)
      .map((messageArray) => messageArray.join());
    expect(winningLottoMessage).toMatch(INPUT_MESSAGE.WINNING_NUMBERS);
    expect(bonusNumberMessage).toMatch(INPUT_MESSAGE.BONUS_NUMBER);
  });

  test.each([
    [
      {
        input: {
          investmentAmount: '5000',
          winningLottoNumbers: '1,2,3,4,5,6',
          bonusNumber: '7',
          lottos: [
            [1, 2, 3, 8, 11, 22],
            [1, 2, 3, 4, 11, 22],
            [1, 2, 3, 4, 5, 22],
            [1, 2, 3, 4, 5, 7],
            [1, 2, 3, 4, 5, 6],
          ],
        },
        output: {
          lottoResult: OUTPUT_MESSAGE.RESULT({
            '3개 일치 (5,000원)': 1,
            '4개 일치 (50,000원)': 1,
            '5개 일치 (1,500,000원)': 1,
            '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
            '6개 일치 (2,000,000,000원)': 1,
          }),
          rateOfReturn: OUTPUT_MESSAGE.RATE_OF_RETURN('40631100%'),
        },
      },
    ],
    [
      {
        input: {
          investmentAmount: '4000',
          winningLottoNumbers: '1,2,3,4,5,6',
          bonusNumber: '7',
          lottos: [
            [1, 2, 3, 8, 11, 22],
            [1, 2, 6, 4, 11, 22],
            [1, 2, 23, 4, 5, 22],
            [1, 2, 19, 11, 5, 7],
          ],
        },
        output: {
          lottoResult: OUTPUT_MESSAGE.RESULT({
            '3개 일치 (5,000원)': 3,
            '4개 일치 (50,000원)': 1,
            '5개 일치 (1,500,000원)': 0,
            '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
            '6개 일치 (2,000,000,000원)': 0,
          }),
          rateOfReturn: OUTPUT_MESSAGE.RATE_OF_RETURN('1625%'),
        },
      },
    ],
  ])(
    '당첨 번호가 $input.winningLottoNumbers이고 보너스 번호가 $input.bonusNumber일 때 당첨 결과가 올바르게 출력되어야 한다.',
    async ({ input: { lottos, investmentAmount, winningLottoNumbers, bonusNumber }, output }) => {
      // given
      mockCreateLottoNumbers(lottos);
      mockInputView({ investmentAmount, winningLottoNumbers, bonusNumber });
      // when
      await runLottoGameController();
      // then
      const [resultTitleMessage, resultMessage, rateOfReturnMessage] = jest
        .spyOn(OutputView, 'printFor')
        .mock.calls.slice(2)
        .map((messageArray) => messageArray.join());
      expect(resultTitleMessage).toMatch(OUTPUT_MESSAGE.RESULT_TITLE);
      expect(resultMessage).toMatch(output.lottoResult);
      expect(rateOfReturnMessage).toMatch(output.rateOfReturn);
    },
  );
});
