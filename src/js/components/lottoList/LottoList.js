import { $, $all } from '../../helper/index.js';
import LottoListTemplate from './LottoListTemplate.js';
import LottoNumbers from './LottoNumbers.js';

const LottoList = count => {
  const lottoNumbers = LottoNumbers();
  const $template = LottoListTemplate({ numbers: lottoNumbers.purchasesLotto(count) });

  $template.addEventListener('change', ({ target }) => {
    if (!target.matches('[data-props="toggle-button"]')) return;
    const isChecked = target.checked;
    if (isChecked) {
      $all('.lotto-numbers').forEach(item => item.classList.remove('d-none'));
      $('.lotto-list').classList.add('flex-col');
      return;
    }

    $all('.lotto-numbers').forEach(item => item.classList.add('d-none'));
    $('.lotto-list').classList.remove('flex-col');
  });

  return $template;
};

export default LottoList;
