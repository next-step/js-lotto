import { LottoMachine } from "./LottoMachine.js";
import { LottoTickets } from "./LottoTickets.js";

export class LottoShop {
    static LOTTO_UNIT = 1_000;
    static buy(price) {
        const count = Math.floor(price / LottoShop.LOTTO_UNIT);
        return Array.from({ length: count }).map(LottoMachine.autoPick);
    }
}
