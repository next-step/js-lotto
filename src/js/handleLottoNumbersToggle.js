import { $, $$ } from './DOM.js';

const handleLottoNumbersToggle = ({ target: { checked } }) => {
  if (!checked) {
    for (let i = 0; i < $$('.lotto-result-number-list').length; i++) {
      $$('.lotto-result-number-list')[i].style.display = 'none';
    }

    $('.lotto-result-list').classList.remove('flex-col');
    return;
  }

  for (let i = 0; i < $$('.lotto-result-number-list').length; i++) {
    $$('.lotto-result-number-list')[i].style.display = 'inline-block';
  }

  $('.lotto-result-list').classList.add('flex-col');
};

export default handleLottoNumbersToggle;
