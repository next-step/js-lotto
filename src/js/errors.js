export class LottoNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = "LottoNumberError";
  }
}

export class WinningNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = "WinningNumberError";
  }
}
