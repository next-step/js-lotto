import { Store } from "./createStore";
import { INITIAL_LOTTO_STATE } from "../reducer/lotto-reducer";
import { lottoReducer } from "../reducer/lotto-reducer";

export const lottoStore = new Store(INITIAL_LOTTO_STATE, lottoReducer);
