export async function executeWithRetry(fn, { askFunc, retries = 3 }) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const res = await askFunc();
      return await fn(res);
    } catch (error) {
      attempt++;
      console.error(
        `오류 발생: ${error}. 재시도 중 (${attempt}/${retries})...`
      );
      if (attempt >= retries) {
        throw error;
      }
    }
  }
}
