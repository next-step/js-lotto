import {
  BONUS_NUMBER_SELECTOR,
  MONEY_INPUT_SELECTOR,
  WINNING_NUMBER_SELECTOR,
} from '../constants/index.js';

export const lottoView = (targetElement, lottoIo, lottoRenderer) => {
  const inputMoney = (event) => {
    event.preventDefault();

    const { dataset } = event.target;

    if (dataset.purpose !== 'inputMoney') return;

    lottoIo.restartShop();

    const { value: money } = event.target.elements.inputMoney;

    if (lottoIo.inputMoney(Number(money))) {
      const tickets = lottoIo.outputTickets();
      const isShowtickets = lottoIo.getIsShowTickets();

      lottoRenderer.renderTickets(tickets, isShowtickets);
      lottoRenderer.renderWinningNumberInputs();

      return;
    }

    lottoRenderer.renderMoneyForm();
  };

  const inputWinningNumbers = (event) => {
    const { dataset } = event.target;

    if (dataset.purpose !== 'inputWinningNumbers') return;

    const winningNumberInputs = targetElement.querySelectorAll(
      WINNING_NUMBER_SELECTOR
    );
    const bonusNumberInput = targetElement.querySelector(BONUS_NUMBER_SELECTOR);
    const winningNumbers = Array.from(winningNumberInputs).map((input) =>
      Number(input.value)
    );
    const bonusNumber = Number(bonusNumberInput.value);

    if (!lottoIo.inputWinningNumbers(winningNumbers, bonusNumber)) return;

    const sameCounts = lottoIo.outputSameCounts();
    const rateOfReturn = lottoIo.outputRateOfReturn();

    lottoRenderer.renderModal(sameCounts, rateOfReturn);
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
    lottoRenderer.renderMoneyForm();
    lottoIo.restartShop();
  };

  const attachListeners = () => {
    targetElement.addEventListener('submit', inputMoney);
    targetElement.addEventListener('click', toggleShowButton);
    targetElement.addEventListener('click', inputWinningNumbers);
    targetElement.addEventListener('click', closeModal);
    targetElement.addEventListener('click', restart);
  };

  lottoRenderer.renderMoneyForm();
  attachListeners();
};
