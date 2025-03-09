class RetryError extends Error {
  constructor(maxRetries) {
    super(`최대 재시도 횟수를 초과했습니다. 최대 재시도 횟수: ${maxRetries}`);
  }
}

function validateMaxRetries(currentRetries, maxRetries) {
  if (currentRetries >= maxRetries) {
    throw new RetryError(maxRetries);
  }
}

export async function retryOnError(
  operation,
  onError = (message) => console.error(message),
  maxRetries = 3,
  currentRetries = 1
) {
  try {
    return await operation();
  } catch (error) {
    onError(error.message);
    validateMaxRetries(currentRetries, maxRetries);
    return retryOnError(operation, onError, maxRetries, currentRetries + 1);
  }
}
