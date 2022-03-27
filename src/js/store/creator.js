import CreateAction from './createAction.js';
import { SET_PRICE } from './actions.js';

const setPrice = (price) => CreateAction(SET_PRICE, { price });

export { setPrice };
