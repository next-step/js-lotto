import { LOTTO_KEYS } from '../service/Constant.js';
import { $resultAreas } from './Selector.js';

// 당첨결과 모달 영역
export const MODAL_RESULT_TR = {
  [LOTTO_KEYS.FIFTH]: '.tr-fifth',
  [LOTTO_KEYS.FOURTH]: '.tr-fourth',
  [LOTTO_KEYS.THIRD]: '.tr-third',
  [LOTTO_KEYS.SECOND]: '.tr-second',
  [LOTTO_KEYS.FIRST]: '.tr-first',
};

// 당첨결과 확인 영역
export const MODAL_RESULT_TR_COLUMN = '.p-3';

export function setVisibleResultAreas(isVisible = true) {
  const className = 'hidden';
  const setVisible = ($el) => (isVisible ? $el.classList.remove(className) : $el.classList.add(className));
  $resultAreas.forEach(($el) => setVisible($el));
}
