import { RESPONSE_NO, RESPONSE_YES } from "../constants.js";

export const validateRestartInput = (input) => {
  if (![RESPONSE_YES, RESPONSE_NO].includes(input)) {
    throw new InvalidRestartInput();
  }
};

export class InvalidRestartInput extends Error {
  constructor() {
    super(
      `잘못된 입력입니다. '${RESPONSE_YES}' 또는 '${RESPONSE_NO}'만 입력할 수 있습니다.`
    );
  }
}
