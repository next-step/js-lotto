export const validateRestartInput = (input) => {
  if (!["y", "n"].includes(input)) {
    throw new InvalidRestartInput();
  }
};

export class InvalidRestartInput extends Error {
  constructor() {
    super("잘못된 입력입니다. 'y' 또는 'n'만 입력할 수 있습니다.");
  }
}
