import { $ } from "../shared/consts.js";
import { createRandomLottoNumber } from "./util/createRandomLottoNumber.js";

/**
 *  1. 티켓 갯수에 따라 ui 변화
 *    - 티켓 개수 텍스트
 *    - 티켓 이미지
 *  2. switch 상태에 따라 ui 변화
 *    - 로또 번호 부여
 *    - flex 상태 변경
 */
const $ticketContainer = $('ul[data-ticket]')

const changeTicketsUiAccordingToSwitchState = (event) => {
  const $randomNumberLists = document.querySelectorAll('li[data-ticket="list"]')
  const randomLottoNumbersArray = createRandomLottoNumber(ticketCount)

  if (event.target.checked) {
    $randomNumberLists.forEach((li, index) => {
      li.lastElementChild.style.display = "inline"
      li.lastElementChild.textContent = randomLottoNumbersArray[index]
    })
    $ticketContainer.classList.add('flex-col')
  } else {
    $ticketContainer.classList.remove('flex-col')
    $randomNumberLists.forEach(li => {
      li.lastElementChild.style.display = "none"
    })
  }
}

const lottoTicket = (amount) => {
  const ticketCount = parseInt(Number(amount) / 1000)
  const $countedTicketLabel = $('#counted-ticket')
  $countedTicketLabel.textContent = `총 ${ticketCount}개를 구매하였습니다.`

  $ticketContainer.innerHTML = `
    <li class="mx-1 text-4xl" data-ticket="list">
      <span data-ticket="image">🎟️ </span>
      <span class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
    </li>\n`.repeat(ticketCount)

  const $switch = $('.switch');
  
  $switch.addEventListener('click', changeTicketsUiAccordingToSwitchState)
}



export default lottoTicket;
