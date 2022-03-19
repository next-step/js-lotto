import { isSpecial } from './valid.js';

export const validCount = amount => {
  if (isNaN(amount) || isSpecial(amount)) throw new Error('숫자를 입력해주세요.');
  if (Number(amount) < 1000) throw new Error('값은 1000 이상이어야 합니다.');
  const count = amount / 1000;
  if (!Number.isInteger(amount / 1000))
    throw new Error('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
  return Math.trunc(count);
};
