import { calculateLottoCount } from '../../domains/order/utils.js';
import { isNumber, isPositiveInteger } from '../../utils/index.js';

export const renderOrderAmountInput = (props) => {
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

export const renderOrderLotto = (props) => {
  const { lotto } = props;
  const itemElement = document.createElement('li');
  itemElement.style.display = 'flex';
  itemElement.style.alignItems = 'center';
  itemElement.style.gap = '8px';

  const imageElement = document.createElement('img');
  imageElement.src = '/ticket.png';
  imageElement.style.width = '32px';
  imageElement.style.height = '32px';

  const textElement = document.createElement('span');
  textElement.textContent = lotto.join(', ');

  itemElement.appendChild(imageElement);
  itemElement.appendChild(textElement);

  return itemElement;
};

export const renderOrderedLottos = (props) => {
  const { lottos } = props;

  const clonedLottos = [...lottos];
  clonedLottos.forEach((lotto) => lotto.sort((a, b) => a - b));

  const containerElement = document.createElement('div');
  containerElement.className = 'lottos__container';

  const labelElement = document.createElement('span');
  labelElement.textContent = `총 ${clonedLottos.length}개를 구매하셨습니다.`;

  const listElement = document.createElement('ul');
  listElement.style.height = '200px';
  listElement.style.overflowY = 'auto';

  clonedLottos.forEach((lotto) => {
    listElement.appendChild(renderOrderLotto({ lotto }));
  });

  containerElement.appendChild(labelElement);
  containerElement.appendChild(listElement);

  return containerElement;
};
