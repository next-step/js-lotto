class LottoError extends Error {
  constructor(message) {
    super(message);

    this.name = "LottoError";
  }
}

export default LottoError;
