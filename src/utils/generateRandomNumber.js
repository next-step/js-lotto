import { maxLottoNumber } from "./constants.js";

function generateRandomNumber() {
  return Math.ceil(Math.random() * maxLottoNumber);
}

export default generateRandomNumber;
