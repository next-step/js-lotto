import { TICKET_ICON } from './Constant.js';

export function setTickets(tickets = []) {
  const $ticketItems = tickets.map((ticket) => getTicketItem(ticket));
  console.log($ticketItems);
  const $ticketList = getTicketList($ticketItems);

  const $lottoIcons = document.querySelector('.lotto-icons');
  $lottoIcons.innerHTML = '';
  $lottoIcons.appendChild($ticketList);
  document.querySelector('.purchasing-status').innerText = `총 ${tickets.length}개를 구매하였습니다.`;
}

export function getTicketList($ticketItems = []) {
  const $ticketList = document.createElement('ul');
  $ticketList.classList.add('d-flex', 'flex-wrap');
  $ticketItems.forEach(($item) => $ticketList.appendChild($item));

  return $ticketList;
}

export function getTicketItem(ticket = []) {
  const $ticketItem = document.createElement('li');

  const $ticketIcon = document.createElement('span');
  $ticketIcon.classList.add('mx-1', 'text-4xl');
  $ticketIcon.innerText = TICKET_ICON;

  const $ticketNumbers = document.createElement('span');
  $ticketNumbers.classList.add('hidden');
  $ticketNumbers.innerText = ticket.join(', ');

  [$ticketIcon, $ticketNumbers].forEach(($el) => $ticketItem.appendChild($el));
  return $ticketItem;
}
