import {PRIZE, PRIZE_BENEFIT} from './constants';

export const formatPrizeKR = prize => {
  if (prize === PRIZE.FIRST) {
    return `6개 일치 (${PRIZE_BENEFIT[prize].toLocaleString()}원)`;
  }
  if (prize === PRIZE.SECOND) {
    return `5개 일치, 보너스 볼 일치 (${PRIZE_BENEFIT[prize].toLocaleString()}원)`;
  }
  if (prize === PRIZE.THIRD) {
    return `5개 일치 (${PRIZE_BENEFIT[prize].toLocaleString()}원)`;
  }
  if (prize === PRIZE.FOURTH) {
    return `4개 일치 (${PRIZE_BENEFIT[prize].toLocaleString()}원)`;
  }
  if (prize === PRIZE.FIFTH) {
    return `3개 일치 (${PRIZE_BENEFIT[prize].toLocaleString()}원)`;
  }
};
