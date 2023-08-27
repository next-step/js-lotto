export class UserInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "USER_INPUT_ERROR";
  }
}
