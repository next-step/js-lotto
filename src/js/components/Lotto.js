import { NUM } from '../utils/constants.js';

class Lotto {
    getRandomNumber() {
        return ~~(
            Math.random() * (NUM.MAX_RANDOM - NUM.MIN_RANDOM) +
            NUM.MIN_RANDOM
        );
    }

    getLotto() {
        const lotto = [];
        const lottoTable = {};

        while (lotto.length < NUM.MAX_LOTTO_LENGTH) {
            const randomNumber = this.getRandomNumber();
            if (!lottoTable[randomNumber]) {
                lottoTable[randomNumber] = 1;
                lotto.push(randomNumber);
            }
        }

        return lotto;
    }

    getMultipleLotto(num) {
        return new Array(num).fill(0).map(() => this.getLotto());
    }
}

export default Lotto;
