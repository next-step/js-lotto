import CreateAction from './CreateAction.js';
import { GET_PRICE, SET_PRICE, TOGGLE_IS_SHOW_NUMBER } from './actions.js';

const getPrice = () => CreateAction(GET_PRICE);
const setPrice = (price) => CreateAction(SET_PRICE, { price });
const toggleIsShowNumber = (isShow) =>
  CreateAction(TOGGLE_IS_SHOW_NUMBER, { isShow });

export { getPrice, setPrice, toggleIsShowNumber };
