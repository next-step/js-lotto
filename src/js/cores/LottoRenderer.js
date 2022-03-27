export class LottoRenderer {
  renderLottoTickets(targetElement, lottoTickets, isShowLottoTickets) {
    const lottoTicketSection = targetElement.querySelector(
      '.lotto-ticket-section'
    );

    lottoTicketSection.innerHTML = `
    <div class="d-flex">
      <label class="flex-auto my-0">총 ${
        lottoTickets.length
      }개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" data-purpose="toggleButton" ${
            isShowLottoTickets ? 'checked' : ''
          }/>
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      ${
        isShowLottoTickets
          ? lottoTickets
              .map(
                (lottoTicket) => `<span class="mx-1 text-4xl">🎟️ </span>
                          <span style="display: inline">${lottoTicket
                            .getLottoNumbers()
                            .join(', ')}</span>`
              )
              .join(' ')
          : lottoTickets
              .map(() => `<span class="mx-1 text-4xl">🎟️ </span>`)
              .join(' ')
      }
    </div>
    `;
  }

  renderWinningNumberInputs(targetElement) {
    const winningNumberForm = targetElement.querySelector(
      '.lotto-winning-number-form'
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
}
