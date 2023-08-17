import ERROR from '../constants/error.js';
import { LOTTO_RETRY_CODE } from '../constants/lotto-config.js';

const isExcludeRetryCode = (code) => !Object.values(LOTTO_RETRY_CODE).includes(code);

const checkValidRetry = (code) => {
  if (isExcludeRetryCode(code)) throw new Error(ERROR.RETRY.INVALID_CODE);
};

export default checkValidRetry;
