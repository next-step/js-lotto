import { LOTTO } from './domains/common/constants.js';
import { getLotto, isValidBonusNumber } from './domains/common/utils.js';
import {
  calculateLottoResults,
  getJackpotTotalAmount,
  isValidJackpot,
} from './domains/jackpot/utils.js';
import { calculateLottoCount } from './domains/order/utils.js';
import {
  getProfitRate,
  getStatisticsResult,
} from './domains/statistics/utils.js';
import { commaizeNumber, isNumber, isPositiveInteger } from './utils/index.js';

let orderAmount = 0;
let lottos = [];

const root = document.querySelector('#app');
root.style.display = 'flex';
root.style.flexDirection = 'column';
root.style.gap = '16px';

const renderMainTitle = () => {
  const titleElement = document.createElement('h1');
  titleElement.textContent = '🎱 행운의 로또';

  return titleElement;
};

const renderOrderAmountInput = (props) => {
  const { onClick } = props;

  const containerElement = document.createElement('div');
  containerElement.style.display = 'flex';
  containerElement.style.flexDirection = 'column';
  containerElement.style.gap = '8px';

  const labelElement = document.createElement('span');
  labelElement.textContent = '구입할 금액을 입력해주세요.';

  const innerContainerElement = document.createElement('div');
  innerContainerElement.style.display = 'flex';
  innerContainerElement.style.gap = '8px';

  const inputElement = document.createElement('input');
  inputElement.placeholder = '금액';

  const submitElement = document.createElement('button');
  submitElement.className = 'btn__primary';
  submitElement.textContent = '구입';
  submitElement.onclick = () => {
    const orderAmount = Number(inputElement.value);

    try {
      if (!isNumber(orderAmount) || !isPositiveInteger(orderAmount)) {
        throw new Error('구입금액을 잘못 입력하셨습니다. 다시 시도해 주세요.');
      }

      const orderCount = calculateLottoCount(orderAmount);
      onClick(orderAmount, orderCount);
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  innerContainerElement.appendChild(inputElement);
  innerContainerElement.appendChild(submitElement);

  containerElement.appendChild(labelElement);
  containerElement.appendChild(innerContainerElement);

  return containerElement;
};

const renderOrderLotto = (lotto, index) => {
  const itemElement = document.createElement('li');

  const imageElement = document.createElement('span');
  imageElement.textContent = `${index + 1}: `;

  const textElement = document.createElement('span');
  textElement.textContent = lotto.join(', ');

  itemElement.appendChild(imageElement);
  imageElement.appendChild(textElement);

  return itemElement;
};

const renderOrderedLottos = () => {
  const clonedLottos = [...lottos];
  clonedLottos.forEach((lotto) => lotto.sort((a, b) => a - b));

  const containerElement = document.createElement('div');
  containerElement.className = 'lottos__container';

  const labelElement = document.createElement('span');
  labelElement.textContent = `총 ${clonedLottos.length}개를 구매하셨습니다.`;

  const listElement = document.createElement('ul');
  listElement.style.height = '200px';
  listElement.style.overflowY = 'auto';

  clonedLottos.forEach((lotto, index) => {
    listElement.appendChild(renderOrderLotto(lotto, index));
  });

  containerElement.appendChild(labelElement);
  containerElement.appendChild(listElement);

  return containerElement;
};

const renderJackpotForm = (props) => {
  const { onClick } = props;

  const containerElement = document.createElement('div');
  containerElement.style.display = 'flex';
  containerElement.style.flexDirection = 'column';
  containerElement.style.gap = '8px';

  const labelElement = document.createElement('span');
  labelElement.textContent =
    '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

  const inputContainerElement = document.createElement('div');
  inputContainerElement.style.display = 'flex';
  inputContainerElement.style.justifyContent = 'space-between';

  const jackpotInputContainerElement = document.createElement('div');

  const jackpotInputLabelElement = document.createElement('label');
  jackpotInputLabelElement.style.display = 'block';
  jackpotInputLabelElement.style.marginBottom = '8px';
  jackpotInputLabelElement.textContent = '당첨 번호';

  jackpotInputContainerElement.appendChild(jackpotInputLabelElement);

  Array.from({ length: LOTTO.SIZE }).forEach(() => {
    const inputElement = document.createElement('input');
    inputElement.className = 'jackpot__number__input';
    inputElement.style.display = 'inline-flex';
    inputElement.style.width = '28px';
    inputElement.style.height = '32px';
    inputElement.style.marginRight = '4px';

    jackpotInputContainerElement.appendChild(inputElement);
  });

  const bonusInputContainerElement = document.createElement('div');
  bonusInputContainerElement.style.textAlign = 'right';

  const bonusInputLabelElement = document.createElement('label');
  bonusInputLabelElement.style.display = 'block';
  bonusInputLabelElement.style.marginBottom = '8px';
  bonusInputLabelElement.textContent = '보너스 번호';

  const bonusInputElement = document.createElement('input');
  bonusInputElement.style.display = 'inline';
  bonusInputElement.style.width = '28px';
  bonusInputElement.style.height = '32px';

  const buttonElement = document.createElement('button');
  buttonElement.className = 'btn__primary';
  buttonElement.style.marginTop = '12px';
  buttonElement.textContent = '결과 확인하기';
  buttonElement.onclick = () => {
    const jackpotNumberElements = document.querySelectorAll(
      '.jackpot__number__input',
    );
    const jackpotNumbers = [...jackpotNumberElements.entries()].map(
      ([_, element]) => Number(element.value),
    );
    const bonusNumber = Number(bonusInputElement.value);

    const validJackpot = isValidJackpot(jackpotNumbers);
    const validBonusNumber = isValidBonusNumber(bonusNumber, jackpotNumbers);

    try {
      if (!validJackpot || !validBonusNumber) {
        throw new Error(
          '당첨 번호 또는 보너스 숫자를 잘못 입력하셨습니다. 다시 시도해 주세요.',
        );
      }
    } catch (error) {
      alert(error.message);
      return;
    }

    onClick(jackpotNumbers, bonusNumber);
  };

  bonusInputContainerElement.appendChild(bonusInputLabelElement);
  bonusInputContainerElement.appendChild(bonusInputElement);

  inputContainerElement.appendChild(jackpotInputContainerElement);
  inputContainerElement.appendChild(bonusInputContainerElement);

  containerElement.appendChild(labelElement);
  containerElement.appendChild(inputContainerElement);
  containerElement.appendChild(buttonElement);

  return containerElement;
};

const renderJackpotStatisticDialog = (props) => {
  const { statisticsResult, profitRate, onClick } = props;

  const dialogElement = document.createElement('dialog');
  dialogElement.open = true;

  const closeElement = document.createElement('span');
  closeElement.textContent = 'X';
  closeElement.style.display = 'block';
  closeElement.style.textAlign = 'right';
  closeElement.style.fontSize = '24px';
  closeElement.style.fontWeight = 'bold';
  closeElement.onclick = () => {
    dialogElement.close();
    dialogElement.remove();
  };

  const titleElement = document.createElement('h2');
  titleElement.textContent = '🏆 당첨 통계 🏆';

  const tableElement = document.createElement('table');

  const headerElement = document.createElement('tr');
  headerElement.innerHTML = `
    <th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 개수</th>
  `;
  tableElement.appendChild(headerElement);

  statisticsResult
    .reverse()
    .forEach(({ matchCount, hasBonus, price, count }) => {
      const bonusText = hasBonus ? '+보너스볼' : '';

      const rowElement = document.createElement('tr');
      rowElement.innerHTML = `
        <td>${matchCount}개${bonusText}</td>
        <td>${commaizeNumber(price)}</td>
        <td>${count}개</td>
      `;

      tableElement.appendChild(rowElement);
    });

  const profitElement = document.createElement('p');
  profitElement.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;

  const buttonElement = document.createElement('button');
  buttonElement.textContent = '다시 시작하기';
  buttonElement.onclick = () => {
    onClick();
    dialogElement.close();
    dialogElement.remove();
  };

  dialogElement.appendChild(closeElement);
  dialogElement.appendChild(titleElement);
  dialogElement.appendChild(tableElement);
  dialogElement.appendChild(profitElement);
  dialogElement.appendChild(buttonElement);

  return dialogElement;
};

const handleReset = () => {
  orderAmount = 0;
  lottos = [];

  root.innerHTML = '';

  root.appendChild(renderMainTitle());
  root.appendChild(renderOrderAmountInput({ onClick: handleClickLottoCount }));
  root.appendChild(renderOrderedLottos());
  root.appendChild(renderJackpotForm({ onClick: handleClickJackpotResult }));
};

const handleClickLottoCount = (amount, orderCount) => {
  orderAmount = amount;

  lottos = Array.from({ length: orderCount }, () =>
    getLotto([...LOTTO.NUMBERS]),
  );

  document
    .querySelector('.lottos__container')
    .replaceWith(renderOrderedLottos());
};

const handleClickJackpotResult = (jackpotNumbers, bonusNumber) => {
  const lottoResults = calculateLottoResults(
    lottos,
    jackpotNumbers,
    bonusNumber,
  );

  const totalJackpotAmount = getJackpotTotalAmount(lottoResults);
  const statisticsResult = getStatisticsResult(lottoResults);

  const profitRate = getProfitRate(orderAmount, totalJackpotAmount);

  root.appendChild(
    renderJackpotStatisticDialog({
      statisticsResult,
      profitRate,
      onClick: handleReset,
    }),
  );
};

root.appendChild(renderOrderAmountInput({ onClick: handleClickLottoCount }));
root.appendChild(renderOrderedLottos());
root.appendChild(renderJackpotForm({ onClick: handleClickJackpotResult }));
