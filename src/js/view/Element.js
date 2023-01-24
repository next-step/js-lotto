import { LOTTO_KEYS } from '../service/Constant.js';
import { $resultAreas } from './Selector.js';

// 수동 입력 영역
export const MANUAL_NUMBER_INPUT = '.manual-number';

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
  setVisibleAreas($resultAreas, isVisible);
}

/**
 *
 * @param {HTMLElement|HTMLElement[]} $el
 * @param {boolean} isVisible
 */
export function setVisibleAreas($el, isVisible = true) {
  const className = 'hidden';
  const setVisible = ($el) => (isVisible ? $el.classList.remove(className) : $el.classList.add(className));
  const elements = Array.isArray($el) ? $el : [$el];
  elements.forEach(($el) => setVisible($el));
}
