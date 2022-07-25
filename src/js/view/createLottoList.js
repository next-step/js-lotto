import createLottoNumber from '../model/createLottoNumber.js';

function createLottoList(count) {
  const lotto = document.querySelector('#lotto-list');
  let template = '';

  lotto.innerHTML = '';

  Array.from({length: count}, it => {
    template += `
      <li class="lotto-item">
        <span class="lotto-icon">🎟️</span>
        <span class="lotto-detail">${createLottoNumber()}</span>
      </li>
    `;
  });

  lotto.innerHTML = template;
}

export default createLottoList;
