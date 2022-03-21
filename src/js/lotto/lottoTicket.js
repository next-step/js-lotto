import { $ } from "../shared/consts.js";
import { createRandomLottoNumber } from "./util/createRandomLottoNumber.js";

const $ticketContainer = $('ul[data-ticket]')

const changeTicketsUiAccordingToSwitchState = (event, randomNumberArray) => {
  const $randomNumberLists = document.querySelectorAll('li[data-ticket="list"]')
  
  if (event.target && event.target.nodeName === 'INPUT') {
    if (event.target.checked) {
      
      $randomNumberLists.forEach((li, index) => {
        li.lastElementChild.style.display = "inline"
        li.lastElementChild.textContent = randomNumberArray[index]
      })
      $ticketContainer.classList.add('flex-col')
    } else {
      $ticketContainer.classList.remove('flex-col')
      $randomNumberLists.forEach(li => {
        li.lastElementChild.style.display = "none"
      })
    }
  }
}

const lottoTicket = (amount) => {
  const ticketCount = Number(amount) / 1000
  const $countedTicketLabel = $('#counted-ticket')
  $countedTicketLabel.textContent = `총 ${ticketCount}개를 구매하였습니다.`

  $ticketContainer.innerHTML = `
    <li class="mx-1 text-4xl" data-ticket="list">
      <span data-ticket="image">🎟️ </span>
      <span class="text-xl" style="display: none; vertical-align: middle;" data-ticket="numbers"></span>
    </li>\n`.repeat(ticketCount)

  const toOneFromFourtyFiveRandomNumber = createRandomLottoNumber(ticketCount)

  const $switch = $('.switch');
  // 이 이벤트가 두번 실행됨
  $switch.addEventListener('click', (event) => {changeTicketsUiAccordingToSwitchState(event, toOneFromFourtyFiveRandomNumber)})
}



export default lottoTicket;
