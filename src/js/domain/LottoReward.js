import LottoTickets from "./LottoTickets.js";
import Winning from "./Winning.js";
import WinningNumbers from "./WinningNumbers.js";

const WINNINGS = {
    0: Winning.getWinning(0, 0),
    1: Winning.getWinning(0, 0),
    2: Winning.getWinning(0, 0),
    3: Winning.getWinning(0, 5_000),
    4: Winning.getWinning(0, 50_000),
    5: Winning.getWinning(0, 1_500_000),
    "5+": Winning.getWinning(0, 30_000_000),
    6: Winning.getWinning(0, 2_000_000_000),
};
const LOTTO_UNIT = 1000;

export default class LottoReward {
    static rating;
    static rate;
    winnings;

    constructor(props) {
        WinningNumbers.validate(props.winningNumbers, props.bonusNumber);
        this.setWinnings();
        this.compute(props)
    }

    setWinnings() {
        this.winnings = {
            0: Winning.getWinning(0, 0),
            1: Winning.getWinning(0, 0),
            2: Winning.getWinning(0, 0),
            3: Winning.getWinning(0, 5_000),
            4: Winning.getWinning(0, 50_000),
            5: Winning.getWinning(0, 1_500_000),
            "5+": Winning.getWinning(0, 30_000_000),
            6: Winning.getWinning(0, 2_000_000_000),
        };
    }

    compute(props) {
        this.computeRating(props);
        this.computeRate();
    }

    computeRating({ lottos, winningNumbers, bonusNumber }) {
        this.lottos = lottos.tickets;

        lottos.tickets
            .map((ticket) => ticket.filter((v) => winningNumbers.includes(v)))
            .map((r, i) =>
                r.length === 5 && lottos.tickets[i].includes(bonusNumber)
                    ? this.winnings[r.length + "+"].count++
                    : this.winnings[r.length + ""].count++
            );
    }

    computeRate() {
        let total = 0;

        for (const [key, value] of Object.entries(this.winnings)) {
            total += value.price * value.count;
        }

        this.rate = (total / (this.lottos.length * LOTTO_UNIT)) * 100;
    }
}
