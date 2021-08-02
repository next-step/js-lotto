import { VALUE } from './Constans.js';

export const isPriceWhthinRange = (price) => {
  return price >= VALUE.LOTTO_MIN_PRICE && price <= VALUE.LOTTO_MAX_PRICE;
};

export const isVaildPrice = (price) => {
  return price % 1000 === 0 ? true : false;
};

export const isVaildNums = (nums) => {
  for (const num of nums) {
    if (num < VALUE.LOTTO_MIN_NUM || num > VALUE.LOTTO_MAX_NUM) {
      return false;
    }
  }
  return true;
};

export const isUniqueNum = (nums) => {
  return new Set(nums).size === VALUE.LOTTO_ALL_NUMBER_COUNT;
};
