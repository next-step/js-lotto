import { Store } from "./createStore.js";
import { INITIAL_LOTTO_STATE } from "../reducer/lotto-reducer.js";
import { lottoReducer } from "../reducer/lotto-reducer.js";

export const lottoStore = new Store(INITIAL_LOTTO_STATE, lottoReducer);
