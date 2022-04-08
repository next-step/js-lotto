import { LottoTickets } from "./LottoTickets.js";

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
    static rating;
    static rate;

    static computeWinning({ lottos, winningNumbers, bonusNumber }) {
        let rating = {
            6: 0,
            "5+": 0,
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
            0: 0,
        };

        lottos
            .map((ticket) => ticket.filter((v) => winningNumbers.includes(v)))
            .map((r, i) =>
                r.length === 5 && lottos[i].includes(bonusNumber)
                    ? rating[r.length + "+"]++
                    : rating[r.length + ""]++
            );

        this.rating = rating;
        this.computeRate();
    }

    computeRate() {
        let total = 0;

        for (const [key, value] of Object.entries(this.rating)) {
            total += value * WINNINGS[key];
        }

        this.rate = (total / (LottoTickets.tickets.length * LOTTO_UNIT)) * 100;
    }
}
