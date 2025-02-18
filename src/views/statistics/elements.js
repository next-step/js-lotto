import { commaizeNumber } from '../../utils/index';

export const renderJackpotStatisticDialog = (props) => {
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
