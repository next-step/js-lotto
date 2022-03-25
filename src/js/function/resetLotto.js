import { $userLottoContainer } from '../constants/dom.js';

export const resetLotto = () => {
  while ($userLottoContainer.hasChildNodes()) {
    $userLottoContainer.removeChild($userLottoContainer.firstChild);
  }
};
