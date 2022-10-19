import createLottoNumber from '../model/createLottoNumber.js';

function createLottoList(count) {
  const lotto = document.querySelector('#lotto-list');
  lotto.innerHTML = '';

  const createLottoTemplate = () => `
    <li class="lotto-item">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-detail">${createLottoNumber()}</span>
    </li>
  `;

  lotto.innerHTML = Array(count).fill(null).map(createLottoTemplate).join('');
}

export default createLottoList;
