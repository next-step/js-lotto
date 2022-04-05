
export const amountInfoComponent = (amount) => `총 ${amount}개를 구매하였습니다.`

export const lottoTicketComponent = (amount) => `<li id="ticket-container" class="mx-1 text-4xl" data-ticket="list">
  <span data-ticket="image">🎟️ </span>
  <span id="ticket-number" class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
</li>\n`.repeat(amount)
