// 배열의 값을 갖는 컨테이너 컴포넌트를 하나의 컴포넌트로 합치는 역할을합니다.
const concatContainer = (array, component) =>
  array.map((item) => component(item)).join('');

const TicketNumber = (ticketNumber) => `
  <span class="mx-1">${ticketNumber}</span>
`;

const TicketNumbers = (ticket) => `
  <div class="d-flex align-items-center lotto-number-container">
    <span class="mx-1 text-4xl">🎟️ </span>
    <div class="lotto-numbers">
      ${concatContainer(ticket.getTicketNumbers(), TicketNumber)}
    </div>
  </div>
`;

export const TicketsNumbers = (tickets) =>
  concatContainer(tickets, TicketNumbers);

export const TicketAmount = (amount) => `
  <div class="d-flex">
    <label class="flex-auto my-0">총 ${amount}개를 구매하였습니다.</label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
`;
