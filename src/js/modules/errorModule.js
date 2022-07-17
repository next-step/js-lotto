class LottoError extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    if (typeof window !== 'undefined') {
      alert(errorMessage);
    } else {
      console.error(errorMessage);
    }
  }
}

export { LottoError };
