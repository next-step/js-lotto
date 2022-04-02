import { LottoTickets } from "./LottoTickets.js";
import { WinningNumbers } from "./WinningNumbers.js";

const WINNINGS = {
    0: 0,
    1: 0,
    2: 0,
    3: 5_000,
    4: 50_000,
    5: 1_500_000,
    "5+": 30_000_000,
    6: 2_000_000_000,
};
const LOTTO_UNIT = 1000;

export class LottoReward {
    tickets;
    winningNumbers;
    bonusNumber;
    rating;
    rate;

    constructor() {
        this.initRating();
    }

    initRating() {
        this.rating = {
            6: 0,
            "5+": 0,
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
            0: 0,
        };
    }

    computeWinning() {
        LottoTickets.tickets
            .map((ticket) => ticket.filter((v) => WinningNumbers.winningNumbers.includes(v.toString())))
            .map((r, i) =>
                r.length === 5 && LottoTickets.tickets[i].includes(+WinningNumbers.bonusNumber)
                    ? this.rating[r.length + "+"]++
                    : this.rating[r.length]++
            );
    }

    computeRate() {
        let total = 0;

        for (const [key, value] of Object.entries(this.rating)) {
            total += value * WINNINGS[key];
        }

        this.rate = (total / (LottoTickets.tickets.length * LOTTO_UNIT)) * 100;
    }
}
