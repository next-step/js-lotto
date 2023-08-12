import {PRIZE_MAP} from './constants/prizeMap';

export const formatPrizeKR = prize => {
  if (prize === 'FIRST') {
    return `6개 일치 (${PRIZE_MAP[prize].toLocaleString()}원)`;
  }
  if (prize === 'SECOND') {
    return `5개 일치, 보너스 볼 일치 (${PRIZE_MAP[prize].toLocaleString()}원)`;
  }
  if (prize === 'THIRD') {
    return `5개 일치 (${PRIZE_MAP[prize].toLocaleString()}원)`;
  }
  if (prize === 'FOURTH') {
    return `4개 일치 (${PRIZE_MAP[prize].toLocaleString()}원)`;
  }
  if (prize === 'FIFTH') {
    return `3개 일치 (${PRIZE_MAP[prize].toLocaleString()}원)`;
  }
};
