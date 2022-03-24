import { LOTTO_MAXIMUM_COUNT, LOTTO_PRICE, PRICE_ALERT } from '../constants/constant.js';
import { $input, $lottoNumbersToggleButton, $sectionAndForm } from '../constants/dom.js';
import { createLotto } from './createLotto.js';
import { setLotto } from './setLotto.js';

export const pushConfirm = () => {
  const inputPrice = $input.value;
  const lottoCount = Math.floor(inputPrice / LOTTO_PRICE);

  if (lottoCount === 0 || lottoCount > LOTTO_MAXIMUM_COUNT) {
    return;
  }

  if (inputPrice % LOTTO_PRICE !== 0) {
    $input.value = '';
    return alert(PRICE_ALERT);
  }

  $sectionAndForm.forEach((sectionAndForm) => {
    sectionAndForm.style.display = 'block';
  });

  const allLotto = createLotto(lottoCount);
  setLotto(allLotto);

  $lottoNumbersToggleButton.checked = false;
};
