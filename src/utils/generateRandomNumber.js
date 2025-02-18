import { LOTTO_NUMBER_RANGE } from "./constants.js";

function generateRandomNumber() {
  return Math.ceil(Math.random() * LOTTO_NUMBER_RANGE.MAXIMUM);
}

export default generateRandomNumber;
