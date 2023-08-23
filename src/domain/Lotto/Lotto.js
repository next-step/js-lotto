export class Lotto {
    #lottoNumbers
    #winningRank

    constructor(lottoNumbers) {
        this.#lottoNumbers = lottoNumbers;
    }

    get lottoNumbers() {
        return this.#lottoNumbers;
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
        if(winningNumberMatchSize === 6) {
            this.#winningRank = 1;
            return;
        }
        if(winningNumberMatchSize === 5 && bonusNumberMatch) {
            this.#winningRank = 2;
            return;
        }
        if(winningNumberMatchSize === 5) {
            this.#winningRank = 3;
            return;
        }
        if(winningNumberMatchSize === 4) {
            this.#winningRank = 4;
            return;
        }
        if(winningNumberMatchSize === 3) {
            this.#winningRank = 5;
            return;
        }
        this.#winningRank = 0;
    }
}