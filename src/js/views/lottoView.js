export const lottoView = (targetSelector, lottoIo, lottoRenderer) => {
  const targetElement = document.querySelector(targetSelector);

  const inputMoney = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputMoney') return;

    lottoIo.clearTickets();

    const moneyInputElement = targetElement.querySelector('.money-input');

    if (lottoIo.inputMoney(Number(moneyInputElement.value))) {
      const tickets = lottoIo.outputTickets();
      const isShowtickets = lottoIo.getIsShowTickets();

      lottoRenderer.renderTickets(targetElement, tickets, isShowtickets);
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

    lottoIo.inputWinningNumbers(winningNumbers);
  };

  const toggleShowButton = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'toggleButton') return;

    lottoIo.toggleShowButton();

    const tickets = lottoIo.outputTickets();
    const isShowTickets = lottoIo.getIsShowTickets();

    lottoRenderer.renderTickets(targetElement, tickets, isShowTickets);
  };

  const attachListeners = () => {
    targetElement.addEventListener('click', inputMoney);
    targetElement.addEventListener('click', toggleShowButton);
    targetElement.addEventListener('click', inputWinningNumbers);
  };

  attachListeners();
};
