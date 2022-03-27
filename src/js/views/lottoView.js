export const lottoView = (targetSelector, lottoIo) => {
  const targetElement = document.querySelector(targetSelector);

  const inputMoney = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputMoney') return;

    lottoIo.clearLottoTickets();

    const moneyInputElement = targetElement.querySelector('.money-input');

    if (lottoIo.inputMoney(Number(moneyInputElement.value)))
      renderLottoTickets();
  };

  const toggleShowButton = () => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'toggleButton') return;

    lottoIo.toggleShowButton();
    renderLottoTickets();
  };

  const renderLottoTickets = () => {
    const lottoTicketSection = targetElement.querySelector(
      '.lotto-ticket-section'
    );

    const lottoTickets = lottoIo.outputLottoTickets();
    const isShowLottoTickets = lottoIo.getIsShowLottoTickets();

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
  };

  const attachListeners = () => {
    targetElement.addEventListener('click', inputMoney);
    targetElement.addEventListener('click', toggleShowButton);
  };

  attachListeners();
};
