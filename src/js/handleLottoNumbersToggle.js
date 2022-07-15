import { $, $$ } from './DOM.js';

const handleLottoNumbersToggle = ({ target: { checked } }) => {
  const lottoResultNumberList = $$('.lotto-result-number-list');
  const lottoResultList = $('.lotto-result-list');

  if (!checked) {
    for (let i = 0; i < lottoResultNumberList.length; i++) {
      lottoResultNumberList[i].style.display = 'none';
    }

    lottoResultList.classList.remove('flex-col');
    return;
  }

  for (let i = 0; i < lottoResultNumberList.length; i++) {
    lottoResultNumberList[i].style.display = 'block';
  }

  lottoResultList.classList.add('flex-col');
};

export default handleLottoNumbersToggle;
