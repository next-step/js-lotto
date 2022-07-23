import { registeReactiveRender } from '../core/reactive/reactiveRender.js';
import checkWinningLotto from '../domain/lotto/checkWinningLotto.js';
import useModal from '../hooks/useModal.js';
import { COMMIT } from '../store/constants.js';
import store from '../store/index.js';
import ModalResult from './ModalResult.js';

export default function FormResult() {
  const { open: openModal } = useModal();
  const $formResult = document.querySelector('#form-result');
  const $inputWinningNumbers = $formResult.querySelectorAll('.winning-number');
  const $inputBonusNumber = $formResult.querySelector('.bonus-number');

  const getWinningNumberArray = () =>
    Array.from($inputWinningNumbers).reduce((acc, $el) => [...acc, $el.valueAsNumber], []);

  const setInvisible = () => {
    $formResult.style.display = 'none';
  };
  const setVisible = () => {
    $formResult.style.display = 'block';
  };

  const render = () => {
    if (!store.state.lottoList.length) {
      setInvisible();
    } else {
      setVisible();
    }
  };

  const showResult = event => {
    event.preventDefault();

    try {
      const winningNumbers = getWinningNumberArray();
      const bonus = $inputBonusNumber.valueAsNumber;

      checkWinningLotto(winningNumbers, bonus);

      store.commit(COMMIT.SET_WON_LOTTO, winningNumbers);
      store.commit(COMMIT.SET_BONUS_NUMBER, bonus);

      ModalResult();
      openModal();
    } catch (error) {
      alert(error.message);
    }
  };

  registeReactiveRender(render);
  $formResult.addEventListener('submit', showResult);
}
