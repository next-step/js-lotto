import { LOTTO } from '../../domains/common/constants.js';
import { isValidBonusNumber } from '../../domains/common/utils.js';
import { isValidJackpot } from '../../domains/jackpot/utils.js';

export const renderJackpotForm = (props) => {
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
