import { LottoTicket } from '../../../src/Model';
import { NUMBER } from '../../../src/constants';

/**
 * 로또 티켓의 번호는 1-43 사이의 숫자들로 구성된다.
 * 당첨 번호는 6개이다.
 * 보너스 번호는 1개이다.
 */

describe('LottoTicket', () => {
  test('로또 티켓이 정상적으로 생성되는지 확인한다.', () => {
    const ticket = new LottoTicket();

    expect(ticket).toBeInstanceOf(LottoTicket);
  });

  test('로또 티켓의 번호는 1-43 사이의 숫자들로 구성된다.', () => {
    const ticket = new LottoTicket();
    const { numbers, bonusNumber } = ticket.getTicketNumbers();
    const ticketNumbers = [...numbers, bonusNumber];
    const validTicketNumbers = ticketNumbers.every(
      (number) =>
        NUMBER.LOTTO_TICKET.MIN_RANGE <= number &&
        number <= NUMBER.LOTTO_TICKET.MAX_RANGE
    );

    expect(validTicketNumbers).toBe(true);
  });

  test('로또 티켓의 당첨 번호는 6개이다.', () => {
    const ticket = new LottoTicket();
    const { numbers } = ticket.getTicketNumbers();

    expect(numbers.length).toBe(6);
  });

  test('로또 티켓의 보너스 번호는 1개이다.', () => {
    const ticket = new LottoTicket();
    const { bonusNumber } = ticket.getTicketNumbers();
    const validBonusNumber =
      NUMBER.LOTTO_TICKET.MIN_RANGE <= bonusNumber &&
      bonusNumber <= NUMBER.LOTTO_TICKET.MAX_RANGE;

    expect(validBonusNumber).toBe(true);
  });
});
