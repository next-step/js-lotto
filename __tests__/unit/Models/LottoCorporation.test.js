import { LottoCorporation } from '../../../src/Model';
import { NUMBER } from '../../../src/constants';
import { isLottoNumber } from '../../../src/utils/Validator';

describe('LottoCorporation', () => {
  const lottoCorporation = new LottoCorporation();

  const purchaseAmount = 5_000;
  const tickets = lottoCorporation.buyTickets(purchaseAmount);

  test('구매금액에 맞는 로또의 개수를 반환하는지 확인한다.', () => {
    const TICKET_PRICE = NUMBER.DEFAULT_TICKET_PRICE;
    const expectedTicketCount = parseInt(purchaseAmount / TICKET_PRICE);

    expect(tickets.length).toBe(expectedTicketCount);
  });

  test.each(tickets)(
    '발급된 로또의 숫자 범위가 유효한지 확인한다.',
    (ticket) => {
      const numbers = ticket.getTicketNumbers();
      const toBeValidNumbers = numbers.every(isLottoNumber);

      expect(toBeValidNumbers).toBeTruthy();
    }
  );

  test.each(tickets)(
    '발급된 로또엔 중복된 숫자가 존재하지 않는다.',
    (ticket) => {
      const ticketNumbers = ticket.getTicketNumbers();
      const uniqueNumbers = new Set(ticketNumbers);
      const toBeSameSize = uniqueNumbers.size === ticketNumbers.length;

      expect(toBeSameSize).toBeTruthy();
    }
  );

  test.each(tickets)(
    '발급된 로또의 숫자들은 오름차순으로 정렬되어있다.',
    (ticket) => {
      const ticketNumbers = ticket.getTicketNumbers();
      const sortedTicketNumbers = [...ticketNumbers].sort((a, b) => a - b);

      const sorted = ticketNumbers.every(
        (number, index) => number === sortedTicketNumbers[index]
      );

      expect(sorted).toBeTruthy();
    }
  );

  const mockCases = [
    {
      ticketNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7 },
      expectedValue: 6,
    },
    {
      ticketNumbers: [11, 12, 13, 14, 15, 16],
      winningNumbers: { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7 },
      expectedValue: 0,
    },
  ];

  test.each(mockCases)(
    '로또 티켓의 결과를 확인한다.',
    ({ ticketNumbers, winningNumbers, expectedValue }) => {
      const { matchingCount } = lottoCorporation.checkTicketResult(
        ticketNumbers,
        winningNumbers
      );

      expect(matchingCount).toBe(expectedValue);
    }
  );
});
