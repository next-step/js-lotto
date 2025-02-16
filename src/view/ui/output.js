export function printLottoTickets(tickets) {
  console.log(`${tickets.length}개를 구매했습니다.`);
  tickets.forEach((ticket) => console.log(`[${ticket.join(", ")}]`));
}
