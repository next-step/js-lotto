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

export const WinningNumberInput = `
  <label class="flex-auto d-inline-block mb-3"
    >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
  >
  <div class="d-flex">
    <div>
      <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
      <div>
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"        
          required
          min="1"
          max="43"
        />
      </div>
    </div>
    <div class="bonus-number-container flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div class="d-flex justify-center">
        <input
          type="number"
          class="bonus-number text-center"
        />
      </div>
    </div>
  </div>
  <button
    id="check-tickets-result"
    type="submit"
    class="open-result-modal-button mt-5 btn btn-cyan w-100"
  >
    결과 확인하기
  </button>
`;
