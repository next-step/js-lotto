export default class AppError extends Error {
  static PREFIX = '[ERROR]';

  name;

  constructor(message, ...args) {
    super(`${AppError.PREFIX} : ${message} ${args}`);
    this.name = this.constructor.name;
  }
}
