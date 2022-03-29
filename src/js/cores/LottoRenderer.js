import {
  FIRST_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
  FOURTH_PLACE,
  FIFTH_PLACE,
} from '../constants/index.js';

export class LottoRenderer {
  targetElement;

  constructor(targetElement) {
    this.targetElement = targetElement;
  }

  renderMoneyForm() {
    const moneyForm = this.targetElement.querySelector('.money-form');

    moneyForm.innerHTML = `<label class="mb-2 d-inline-block"
    >구입할 금액을 입력해주세요.
  </label>
  <div class="d-flex">
    <input
      type="number"
      class="money-input w-100 mr-2 pl-2"
      placeholder="구입 금액"
    />
    <button type="button" class="money-input-button btn btn-cyan" data-purpose="inputMoney">확인</button>
  </div>`;
  }

  renderTickets(tickets, isShowTickets) {
    const ticketSection = this.targetElement.querySelector('.ticket-section');

    ticketSection.innerHTML = `
    <div class="d-flex">
      <label class="ticket-notice flex-auto my-0">총 ${
        tickets.length
      }개를 구매하였습니다.</label>
      <div class="ticket-toggle-button flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" data-purpose="toggleButton" ${
            isShowTickets ? 'checked' : ''
          }/>
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="${
      isShowTickets ? 'd-flex flex-col flex-wrap' : 'd-flex flex-wrap'
    }">
      ${
        isShowTickets
          ? tickets
              .map(
                (ticket) => `<div>
                          <span class="ticket mx-1 text-4xl">🎟️ </span>
                          <span class="ticket-numbers">${ticket
                            .getNumbers()
                            .join(', ')}</span>
                            </div>`
              )
              .join(' ')
          : tickets
              .map(() => `<span class="ticket mx-1 text-4xl">🎟️ </span>`)
              .join(' ')
      }
    </div>
    `;
  }

  removeTickets() {
    const ticketSection = this.targetElement.querySelector('.ticket-section');

    ticketSection.innerHTML = '';
  }

  renderWinningNumberInputs() {
    const winningNumberForm = this.targetElement.querySelector(
      '.winning-number-form'
    );

    winningNumberForm.innerHTML = `<label class="flex-auto d-inline-block mb-3"
    >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
  >
  <div class="d-flex">
    <div>
      <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
      <div>
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
      </div>
    </div>
    <div class="bonus-number-container flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div class="d-flex justify-center">
        <input type="number" class="bonus-number text-center" />
      </div>
    </div>
  </div>
  <button
    type="button"
    class="open-result-modal-button mt-5 btn btn-cyan w-100"
    data-purpose="inputWinningNumbers"
  >
    결과 확인하기
  </button>`;
  }

  removeWinningNumberInputs() {
    const winningNumberForm = this.targetElement.querySelector(
      '.winning-number-form'
    );

    winningNumberForm.innerHTML = '';
  }

  renderModal(sameCounts, rateOfReturn) {
    const modalDiv = this.targetElement.querySelector('.modal');

    modalDiv.classList.add('open');

    modalDiv.innerHTML = `
    <div class="modal-inner p-10">
      <div class="modal-close">
        <svg viewbox="0 0 40 40" data-purpose="closeModal">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" data-purpose="closeModal" />
        </svg>
      </div>

      <h2 class="text-center">🏆 당첨 통계 🏆</h2>
      <div class="d-flex justify-center">
        <table class="result-table border-collapse border border-black">
          <thead>
            <tr class="text-center">
              <th class="p-3">일치 갯수</th>
              <th class="p-3">당첨금</th>
              <th class="p-3">당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td class="p-3">3개</td>
              <td class="p-3">5,000</td>
              <td class="p-3">${sameCounts.get(FIFTH_PLACE)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">4개</td>
              <td class="p-3">50,000</td>
              <td class="p-3">${sameCounts.get(FOURTH_PLACE)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">5개</td>
              <td class="p-3">1,500,000</td>
              <td class="p-3">${sameCounts.get(THIRD_PLACE)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">5개 + 보너스볼</td>
              <td class="p-3">30,000,000</td>
              <td class="p-3">${sameCounts.get(SECOND_PLACE)}개</td>
            </tr>
            <tr class="text-center">
              <td class="p-3">6개</td>
              <td class="p-3">2,000,000,000</td>
              <td class="p-3">${sameCounts.get(FIRST_PLACE)}개</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-center font-bold">당신의 총 수익률은 ${rateOfReturn}% 입니다.</p>
      <div class="d-flex justify-center mt-5">
        <button type="button" class="btn btn-cyan" data-purpose="restart">다시 시작하기</button>
      </div>
    </div>`;
  }

  removeModal() {
    const modalDiv = this.targetElement.querySelector('.modal');
    modalDiv.innerHTML = '';

    modalDiv.classList.remove('open');
  }
}
