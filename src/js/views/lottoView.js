export const lottoView = (targetElement, lottoIo, lottoRenderer) => {
  const inputMoney = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputMoney') return;

    lottoIo.clearTickets();

    const moneyInputElement = targetElement.querySelector('.money-input');

    if (lottoIo.inputMoney(Number(moneyInputElement.value))) {
      const tickets = lottoIo.outputTickets();
      const isShowtickets = lottoIo.getIsShowTickets();

      lottoRenderer.renderTickets(tickets, isShowtickets);
      lottoRenderer.renderWinningNumberInputs();
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

    lottoIo.inputWinningNumbers(winningNumbers);

    const results = lottoIo.outputResults();

    lottoRenderer.renderModal(results);
  };

  const toggleShowButton = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'toggleButton') return;

    lottoIo.toggleShowButton();

    const tickets = lottoIo.outputTickets();
    const isShowTickets = lottoIo.getIsShowTickets();

    lottoRenderer.renderTickets(tickets, isShowTickets);
  };

  const closeModal = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'closeModal') return;

    lottoRenderer.removeModal();
  };

  const restart = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'restart') return;

    lottoRenderer.removeModal();
    lottoRenderer.removeTickets();
    lottoRenderer.removeWinningNumberInputs();
    lottoIo.restart();
  };

  const attachListeners = () => {
    targetElement.addEventListener('click', inputMoney);
    targetElement.addEventListener('click', toggleShowButton);
    targetElement.addEventListener('click', inputWinningNumbers);
    targetElement.addEventListener('click', closeModal);
    targetElement.addEventListener('click', restart);
  };

  attachListeners();
};
