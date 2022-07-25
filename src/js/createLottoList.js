import createLottoNumber from './createLottoNumber.js';

function createLottoList(count) {
  const lotto = document.querySelector('#lotto-list');
  let template = '';

  lotto.innerHTML = '';

  for (let i = 0; i < count; i++) {
    template += `
    <li class="lotto-item">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-detail">${createLottoNumber()}</span>
    </li>
    `;
  }

  lotto.innerHTML = template;
}

export default createLottoList;
