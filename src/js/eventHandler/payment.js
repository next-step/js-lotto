import lottoManager from '../model/lotto.js';
import {
  setBriefMode,
  setDetailMode,
  showManualNumberingForm,
  updateLottoCount,
} from '../view/main.js';

export const handleLottoPayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;

  lottoManager.resetAll();
  lottoManager.setAmount(price);

  if (!lottoManager.amount) {
    alert('발급할 수 있는 로또가 존재하지 않습니다.');
    return;
  }

  updateLottoCount(lottoManager.amount);
  showManualNumberingForm();
};

export const handleLottoDetailToggle = ({ target }) => {
  if (target.checked) {
    setDetailMode();
  } else {
    setBriefMode();
  }
};
