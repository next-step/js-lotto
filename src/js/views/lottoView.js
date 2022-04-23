import {
  WINNING_BOUNS_NUMBER_COUNT,
  WINNING_NUMBER_COUNT,
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
    event.preventDefault();

    const { dataset } = event.target;

    if (dataset.purpose !== 'inputWinningNumbers') return;

    const numberInputs = Array.from(event.target.elements).slice(
      0,
      WINNING_BOUNS_NUMBER_COUNT
    );

    const winningNumbers = numberInputs
      .slice(0, WINNING_NUMBER_COUNT)
      .map((input) => Number(input.value));

    const bonusNumber = Number(
      numberInputs[WINNING_NUMBER_COUNT + WINNING_BOUNS_NUMBER_COUNT - 1]
    );

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
    targetElement.addEventListener('submit', inputWinningNumbers);
    targetElement.addEventListener('click', closeModal);
    targetElement.addEventListener('click', restart);
  };

  lottoRenderer.renderMoneyForm();
  attachListeners();
};
