import { $ } from "./consts.js";

export const lottoTicket = (amount) => {
  amount = Number(amount)

  const $countedTicketLabel = $('#counted-ticket')
  $countedTicketLabel.textContent = `총 ${parseInt(amount / 1000)}개를 구매하였습니다.`
}
