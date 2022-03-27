export const lottoView = (targetSelector, lottoIo, lottoRenderer) => {
  const targetElement = document.querySelector(targetSelector);

  const inputMoney = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputMoney') return;

    lottoIo.clearLottoTickets();

    const moneyInputElement = targetElement.querySelector('.money-input');

    if (lottoIo.inputMoney(Number(moneyInputElement.value))) {
      const lottoTickets = lottoIo.outputLottoTickets();
      const isShowLottoTickets = lottoIo.getIsShowLottoTickets();

      lottoRenderer.renderLottoTickets(
        targetElement,
        lottoTickets,
        isShowLottoTickets
      );
      lottoRenderer.renderWinningNumberInputs(targetElement);
    }
  };

  const inputWinningNumbers = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputWinningNumbers') return;

    const winningNumberInputs = targetElement.querySelectorAll(
      '.winning-number, .bonus-number'
    );
    const winningNumbers = Array.from(winningNumberInputs).map((input) =>
      Number(input.value)
    );
  };

  const toggleShowButton = () => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'toggleButton') return;

    lottoIo.toggleShowButton();

    const lottoTickets = lottoIo.outputLottoTickets();
    const isShowLottoTickets = lottoIo.getIsShowLottoTickets();

    lottoRenderer.renderLottoTickets(
      targetElement,
      lottoTickets,
      isShowLottoTickets
    );
  };

  const attachListeners = () => {
    targetElement.addEventListener('click', inputMoney);
    targetElement.addEventListener('click', toggleShowButton);
    targetElement.addEventListener('click', inputWinningNumbers);
  };

  attachListeners();
};
