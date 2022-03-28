const RATING = {
    3: {
        count: "3개",
        winnings: 5000,
    },
    4: {
        count: "4개",
        winnings: 50000,
    },
    5: {
        count: "5개",
        winnings: 1500000,
    },
    "5+": {
        count: "5개 + 보너스볼",
        winnings: 30000000,
    },
    6: {
        count: "6개",
        winnings: 2000000000,
    },
};

export class MatchingLotto {
    tickets = null;
    winningNumbers = null;
    bonusNumber = null;
    rating = null;
    rate = 0;

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
        this.#setRating(this.rating);
    }

    computeRate() {
        let total = 0;
        this.tickets.length * 1000;

        for (const [key, value] of Object.entries(this.rating)) {
            if (RATING[key]) {
                total += value * RATING[key].winnings;
            }
        }

        this.#setRate((total / (this.tickets.length * 1000)) * 100);
    }

    getTickets() {
        return this.tickets;
    }

    setTickets(numbers) {
        this.tickets = numbers;
    }

    setWinningNumbers(numbers) {
        this.winningNumbers = numbers;
    }

    setBonusNumber(number) {
        this.bonusNumber = number;
    }

    #setRate(rate) {
        this.rate = rate;
    }

    getRate() {
        return this.rate;
    }

    #setRating(rating) {
        this.rating = rating;
    }

    getRating() {
        return this.rating;
    }
}
