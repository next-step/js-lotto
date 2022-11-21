import { GAME } from "./constants.js";

export const getLottoRandomNumber = () => {
  return Math.floor(Math.random() * (GAME.MAX_NUMBER - GAME.MIN_NUMBER) + 1);
};
