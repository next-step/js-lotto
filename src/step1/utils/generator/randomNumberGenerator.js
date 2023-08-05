import { MAX_LOTTO_NUMBER } from '../../constants/lotto';

export const RandomNumberGenerator = {
  generateRandomNumber() {
    return Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
  },
};
