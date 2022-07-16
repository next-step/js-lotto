import { $, $$ } from './DOM.js';

const handleLottoNumbersToggle = ({ target: { checked } }) => {
  const lottoResultNumberList = $$('.lotto-result-number-list');
  const lottoResultList = $('.lotto-result-list');

  if (!checked) {
    lottoResultNumberList.forEach((element) => {
      element.style.display = 'none';
    });

    lottoResultList.classList.remove('flex-col');
    return;
  }

  lottoResultNumberList.forEach((element) => {
    element.style.display = 'block';
  });

  lottoResultList.classList.add('flex-col');
};

export default handleLottoNumbersToggle;
