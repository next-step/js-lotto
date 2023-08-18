export default class AppError extends Error {
  static PREFIX = '[ERROR]';

  name;

  constructor(message: string) {
    super(`${AppError.PREFIX} : ${message}`);
    this.name = this.constructor.name;
  }
}
