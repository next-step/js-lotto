export class LottoNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = "LottoNumberError";
  }
}
