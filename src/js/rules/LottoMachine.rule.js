import { LOTTO_PLAYABLE_STATE_ERR_MSG } from "../constants/error";
import { LottoMachine } from "../domain";

export const lottoMachineRule = {
  validates(value) {
    if (!this.isPlayableState(value)) throw new Error(LOTTO_PLAYABLE_STATE_ERR_MSG);

    return true;
  },

  isPlayableState(value) {
    return Array.from([LottoMachine.PLAYABLE, LottoMachine.UNPLAYABLE]).includes(value);
  },
};
