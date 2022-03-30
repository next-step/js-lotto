const RATING = {
    3: {
        count: "3개",
        winnings: 5_000,
    },
    4: {
        count: "4개",
        winnings: 50_000,
    },
    5: {
        count: "5개",
        winnings: 1_500_000,
    },
    "5+": {
        count: "5개 + 보너스볼",
        winnings: 30_000_000,
    },
    6: {
        count: "6개",
        winnings: 2_000_000_000,
    },
};
const LOTTO_UNIT = 1000;

export class MatchingLotto {
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
        this.tickets
            .map((ticket) => ticket.filter((v) => this.winningNumbers.includes(v.toString())))
            .map((r, i) =>
                r.length === 5 && this.tickets[i].includes(+this.bonusNumber)
                    ? this.rating[r.length + "+"]++
                    : this.rating[r.length]++
            );
        this.computeRate();
    }

    computeRate() {
        let total = 0;

        for (const [key, value] of Object.entries(this.rating)) {
            if (RATING[key]) {
                total += value * RATING[key].winnings;
            }
        }

        this.rate = (total / (this.tickets.length * LOTTO_UNIT)) * 100;
    }
}
