import { ERROR_MARKER } from '../constants/index';

const errorFallback = (errorMessage) => {
  console.error(`${ERROR_MARKER} ${errorMessage}`);
};

export default errorFallback;
