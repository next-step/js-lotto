import { LOTTO_UNIT_PRICE } from './constants/index.js';
import createLottos from './createLottos.js';
import { $, validate } from './utils/index.js';
import { LottoList } from './views/index.js';

const lottoList = new LottoList($('#lotto-list'));

document.getElementById('checkout').addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    const { value } = e.target.elements.won;

    validate.isMultipleOfLottoPrice(value);

    const lottos = createLottos(value / LOTTO_UNIT_PRICE);

    lottoList.render(lottos);
    $(
      '#orders-message'
    ).textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    $('#orders').style.display = 'block';
  } catch (error) {
    alert(error.message);
  }
});

$('.lotto-numbers-toggle-button').addEventListener('click', (e) => {
  if (e.target.checked) {
    lottoList.showLottoDetail();
  } else {
    lottoList.hideLottoDetail();
  }
});
