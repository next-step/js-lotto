import {
  createElement,
  createSvgElement,
  addClassNames,
  createHeading,
  getQuerySelector,
  getQuerySelectorAll
} from '../../../view/DOMHandler.js';
import { addEvent } from '../../../view/eventHandler.js';
import { LOTTO_PRIZE, LOTTO_MATCH_COUNT } from '../../constants/index.js';
import { formatNumberToCKoreanCurrency } from '../../../utils/index.js';

class ResultModal {
  #modalElement = null;
  #winningRateElement = null;
  #tableBuilder = null;
  #LottoMachine = null;
  #LottoCalculator = null;
  #LottoOrganizer = null;
  #retryCallback = null;
  #tableDataEntries = [];

  constructor(tableBuilder, LottoMachine, LottoCalculator, LottoOrganizer, retryCallback) {
    this.#tableBuilder = tableBuilder;
    this.#LottoMachine = LottoMachine;
    this.#LottoCalculator = LottoCalculator;
    this.#LottoOrganizer = LottoOrganizer;
    this.#retryCallback = retryCallback;
  }

  #attachRetryEvent($retryButton) {
    addEvent($retryButton, 'click', () => {
      this.#retryCallback();
    });
  }

  #getLottoResult({ winningLottoNumber, bonusNumber }, lottoTickets) {
    const lottoMachine = new this.#LottoMachine(winningLottoNumber, bonusNumber);
    const lottoCalculator = new this.#LottoCalculator(lottoMachine.winningLottoNumber, lottoMachine.bonusNumber);
    const lottoOrganizer = new this.#LottoOrganizer(lottoCalculator);
    lottoOrganizer.matchToLottoTickets(lottoTickets);
    const winningRate = lottoOrganizer.getWinningReturnRate(lottoTickets);
    const resultOfLottoTickets = lottoTickets.map(({ lottoNumber, result }) => ({
      lottoNumber,
      result
    }));

    return {
      winningRate,
      resultOfLottoTickets
    };
  }

  #createModalContainer() {
    const modalContainerClassNames = ['modal'];
    const $modalContainer = createElement('div');
    addClassNames($modalContainer, modalContainerClassNames);
    return $modalContainer;
  }

  #createModalWrapper() {
    const modalWrapperClassNames = ['modal-inner', 'p-10'];
    const $modalWrapper = createElement('div');
    addClassNames($modalWrapper, modalWrapperClassNames);
    return $modalWrapper;
  }

  #createModalCloseButton() {
    const closeButtonContainerClassNames = ['modal-close'];
    const svgPathClassNames = ['close-x'];

    const $closeButtonContainer = createElement('div');
    const $closeButtonSvgIcon = createSvgElement('svg');
    const $svgPath = createSvgElement('path');

    $closeButtonSvgIcon.setAttribute('viewBox', '0 0 40 40');
    $svgPath.setAttribute('d', 'M 10,10 L 30,30 M 30,10 L 10,30');

    $closeButtonSvgIcon.appendChild($svgPath);
    $closeButtonContainer.appendChild($closeButtonSvgIcon);

    addClassNames($svgPath, svgPathClassNames);
    addClassNames($closeButtonContainer, closeButtonContainerClassNames);
    addEvent($closeButtonContainer, 'click', () => this.#close());
    return $closeButtonContainer;
  }

  #createModalHeader() {
    const headerClassNames = ['text-center'];
    const $modalHeading = createHeading('h2', '🏆 당첨 통계 🏆');
    addClassNames($modalHeading, headerClassNames);
    return $modalHeading;
  }

  #createResultTable() {
    const tableContainerClassNames = ['d-flex', 'justify-center'];
    const tableClassNames = ['result-table', 'border-collapse', 'border', 'border-black'];

    const $tableContainer = createElement('div');
    const $table = createElement('table');

    addClassNames($tableContainer, tableContainerClassNames);
    addClassNames($table, tableClassNames);

    $tableContainer.appendChild($table);
    return $tableContainer;
  }

  #createResultTableHeader() {
    const tableHeaderList = ['일치 갯수', '당첨금', '당첨 갯수'];

    const tableHeaderItems = tableHeaderList.map((header) => ({
      textContent: header
    }));
    const $resultTableHeader = this.#tableBuilder.createTableHeader(tableHeaderItems);
    return $resultTableHeader;
  }

  #createResultTableBody() {
    const lottoMatchList = ['3개', '4개', '5개', '5개 + 보너스볼', '6개'];
    const lottoPrizes = Object.values(LOTTO_PRIZE).slice(0, -1).reverse();

    const resultTableBodyItems = Object.keys(LOTTO_MATCH_COUNT).map((key, index) => ({
      matchCount: {
        textContent: lottoMatchList[index]
      },
      lottoPrize: {
        textContent: formatNumberToCKoreanCurrency(lottoPrizes[index])
      },
      winningCount: {
        textContent: 0
      }
    }));

    const $resultTableBody = this.#tableBuilder.createTableBody(resultTableBodyItems);
    this.#setLottoTableDataEntries($resultTableBody);

    return $resultTableBody;
  }

  #createResultContent() {
    const resultContentClassNames = ['text-center', 'font-bold'];
    const $resultContent = createElement('p');
    addClassNames($resultContent, resultContentClassNames);
    this.#winningRateElement = $resultContent;
    return $resultContent;
  }

  #createRetryButton() {
    const buttonWrapperClassNames = ['d-flex', 'justify-center', 'mt-5'];
    const buttonClassNames = ['btn', 'btn-cyan'];

    const $buttonWrapper = createElement('div');
    const $retryButton = createElement('button');

    addClassNames($buttonWrapper, buttonWrapperClassNames);
    addClassNames($retryButton, buttonClassNames);
    $retryButton.setAttribute('type', 'button');
    $retryButton.textContent = '다시 시작하기';
    this.#attachRetryEvent($retryButton);
    $buttonWrapper.appendChild($retryButton);
    return $buttonWrapper;
  }

  #setTableClassNames($table) {
    const tableRowClassNames = ['text-center'];
    const tableHeaderClassNames = ['p-3'];
    const tableCellClassNames = ['p-3'];

    const $tableRows = getQuerySelectorAll('tr', $table);
    const $tableHeaders = getQuerySelectorAll('th', $table);
    const $tableCells = getQuerySelectorAll('td', $table);

    $tableRows.forEach(($row) => addClassNames($row, tableRowClassNames));
    $tableHeaders.forEach(($header) => addClassNames($header, tableHeaderClassNames));
    $tableCells.forEach(($cell) => addClassNames($cell, tableCellClassNames));
  }

  #setLottoTableDataEntries($tableBody) {
    const $tableRows = getQuerySelectorAll('tr', $tableBody);
    $tableRows.forEach(($tr) =>
      this.#tableDataEntries.push({
        element: $tr.lastChild,
        count: 0
      })
    );
  }

  #setLottoWinningRateTextContent(winningRate) {
    this.#winningRateElement.textContent = `당신의 총 수익률은 ${formatNumberToCKoreanCurrency(winningRate)}% 입니다.`;
  }

  #setLottoWinningCountZero() {
    this.#tableDataEntries.map((entry) => (entry.count = 0));
  }

  #setLottoWinningCountTextContent(lottoTickets) {
    lottoTickets.forEach(({ result }) => {
      const { rank } = result;

      switch (rank) {
        case 'FIRST':
          this.#tableDataEntries[4].count += 1;
          break;
        case 'SECOND':
          this.#tableDataEntries[3].count += 1;
          break;
        case 'THIRD':
          this.#tableDataEntries[2].count += 1;
          break;
        case 'FOURTH':
          this.#tableDataEntries[1].count += 1;
          break;
        case 'FIFTH':
          this.#tableDataEntries[0].count += 1;
          break;
        default:
          break;
      }
    });

    this.#tableDataEntries.forEach(({ element, count }) => (element.textContent = count));
  }

  #open() {
    this.#modalElement.classList.add('open');
  }

  #close() {
    this.#modalElement.classList.remove('open');
  }

  getLottoWinningBonusNumber(winningNumbers, lottoTickets) {
    const { winningRate, resultOfLottoTickets } = this.#getLottoResult(winningNumbers, lottoTickets);
    this.#setLottoWinningCountZero();
    this.#setLottoWinningRateTextContent(winningRate);
    this.#setLottoWinningCountTextContent(resultOfLottoTickets);
    this.#open();
  }

  createModal() {
    const $modalContainer = this.#createModalContainer();
    const $modalWrapper = this.#createModalWrapper();
    const $modalCloseButton = this.#createModalCloseButton();
    const $modalHeader = this.#createModalHeader();
    const $resultTableContainer = this.#createResultTable();
    const $resultTableHeader = this.#createResultTableHeader();
    const $resultTableBody = this.#createResultTableBody();
    const $resultContent = this.#createResultContent();
    const $retryButton = this.#createRetryButton();

    const $resultTable = getQuerySelector('table', $resultTableContainer);
    $resultTable.append($resultTableHeader, $resultTableBody);
    $resultTableContainer.appendChild($resultTable);
    $modalWrapper.append($modalCloseButton, $modalHeader, $resultTableContainer, $resultContent, $retryButton);
    $modalContainer.appendChild($modalWrapper);

    this.#setTableClassNames($resultTable);
    this.#modalElement = $modalContainer;
    return $modalContainer;
  }
}

export default ResultModal;
