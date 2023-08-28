export function withErrorHandler(callback, errorHandler) {
  return function (...args) {
    try {
      return callback(...args);
    } catch (error) {
      errorHandler(error);
    }
  };
}
