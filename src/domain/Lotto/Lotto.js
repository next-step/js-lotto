import {LOTTO_INFO} from "../../consts/Lotto.js";

export class Lotto {
    #lottoNumbers
    #winningRank

    constructor(lottoNumbers) {
        this.#lottoNumbers = lottoNumbers;
    }

    get lottoNumbers() {
        return this.#lottoNumbers;
    }

    getSortedLottoNumbers() {
        return this.#lottoNumbers.sort((a, b) => a - b);
    }

    get winningRank() {
        return this.#winningRank;
    }

    #matchedWinningNumberSize(winningNumbers) {
        return winningNumbers.filter(number => this.lottoNumbers.includes(number)).length;
    }

    #matchBonusNumber(bonusNumber) {
        return this.lottoNumbers.includes(bonusNumber);
    }

    setWinningRank(winningNumbers, bonusNumber) {
        const winningNumberMatchSize = this.#matchedWinningNumberSize(winningNumbers);
        const bonusNumberMatch = this.#matchBonusNumber(bonusNumber);

        const winningCondition = LOTTO_INFO.WINNING_CONDITION.find((CONDITION) =>
            (CONDITION.MATCH === winningNumberMatchSize && CONDITION.BONUS === bonusNumberMatch)
        )

        if(winningCondition) {
            this.#winningRank = winningCondition.RANK;
            return;
        }
        this.#winningRank = 0;

    }
}