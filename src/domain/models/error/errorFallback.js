import { ERROR_MARKER } from '../../constants/index.js';

const errorFallback = (errorMessage) => {
  console.error(`${ERROR_MARKER} ${errorMessage}`);
};

export default errorFallback;
