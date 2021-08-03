import CreateAction from "../Core/Redux/CreateAction.js";
import {
  GET_PRICE,
  SET_PRICE,
  GET_NUMBERS,
  SHOW_NUMBERS,
  SET_WINNING_NUMBERS,
  SET_BONUS_NUMBER,
} from "./actions.js";

const getPrice = () => CreateAction(GET_PRICE);
const setPrice = (price) => CreateAction(SET_PRICE, { price });
const showNumbers = (isShow) => CreateAction(SHOW_NUMBERS, { isShow });
const setWinningNumbers = (winningNumbers) =>
  CreateAction(SET_WINNING_NUMBERS, { winningNumbers });
const setBonusNumber = (bonusNumber) =>
  CreateAction(SET_BONUS_NUMBER, { bonusNumber });

export { getPrice, setPrice, showNumbers, setWinningNumbers, setBonusNumber };
