import { LottoCorporation } from '../../../src/Model';

describe('LottoCorporation', () => {
  const lottoCorporation = new LottoCorporation();

  test('로또회사가 인수한 상점에서 로또를 구매할 수 있다.', () => {
    const purchaseAmount = 5_000;
    const tickets = lottoCorporation.buyTickets(purchaseAmount);

    expect(ticket).toBe('구현하기');
  });

  test('로또 티켓의 결과를 확인한다.', () => {
    const mockTicketNumbers = [
      [1, 2, 3, 4, 5, 6],
      [11, 12, 13, 14, 15, 16],
    ];

    const mockWinningNumbers = {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const mockExpect = [6, 0];

    mockTicketNumbers.forEach((mockTicketNumber, index) => {
      const { matchingCount } = lottoCorporation.checkTicketResult(
        mockTicketNumber,
        mockWinningNumbers
      );

      expect(matchingCount).toBe(mockExpect[index]);
    });
  });
});
