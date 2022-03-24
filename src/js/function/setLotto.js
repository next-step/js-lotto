import { $lottoCountText, $userLottoContainer } from '../constants/dom.js';
import { resetLotto } from './resetLotto.js';

const createLottoWrapper = (lottoWrapper) => {
  lottoWrapper.className = 'user-lotto-wrapper';
};

const createLottoItem = (lottoItem) => {
  lottoItem.className = 'user-lotto mx-1 text-4xl';
  lottoItem.textContent = '🎟️';
};

const createLottoNumber = (lottoNumber, item) => {
  lottoNumber.className = 'user-lotto-number mx-1 text-4xl';
  lottoNumber.textContent += item;
  lottoNumber.style.display = 'none';
};

export const setLotto = (lotto) => {
  resetLotto();
  lotto.forEach((item) => {
    const lottoWrapper = document.createElement('div');
    const lottoItem = document.createElement('span');
    const lottoNumber = document.createElement('span');

    createLottoWrapper(lottoWrapper);
    createLottoItem(lottoItem);
    createLottoNumber(lottoNumber, item);

    $userLottoContainer.append(lottoWrapper);
    lottoWrapper.append(lottoItem, lottoNumber);
  });

  $lottoCountText.textContent = `총 ${lotto.length}개를 구매하였습니다.`;
};
