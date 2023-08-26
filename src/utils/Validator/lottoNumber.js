import { NUMBER } from '../../constants';
import { isInRange } from './';

export const isLottoNumber = (number) =>
  isInRange({
    number,
    min: NUMBER.LOTTO_TICKET.MIN_RANGE,
    max: NUMBER.LOTTO_TICKET.MAX_RANGE,
  });
