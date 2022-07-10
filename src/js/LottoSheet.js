import { isPriceUnitCheck } from './validation/index.js';

const LottoSheet = ({ form, input }) => {
  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    if (!isPriceUnitCheck(input)) {
      alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
      return;
    }

    alert('로또를 출력합니다!');
  };

  form.addEventListener('submit', onFormSubmitHandler);
};

export default LottoSheet;
