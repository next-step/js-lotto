import { isPriceUnitCheck } from './validation/index.js';

import LottoList from './LottoList.js';

const LottoSheet = ({ target, form, input }) => {
  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    if (!isPriceUnitCheck(input)) {
      alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
      return;
    }

    LottoList({ target, input });
  };

  form.addEventListener('submit', onFormSubmitHandler);
};

export default LottoSheet;
