import { NUM } from '../utils/constants.js';
import { shuffle } from '../utils/helper.js';

class Lotto {
    getRandomNumber() {
        return ~~(
            Math.random() * (NUM.MAX_RANDOM - NUM.MIN_RANDOM) +
            NUM.MIN_RANDOM
        );
    }

    getLotto() {
        const lotto = Array.from(
            { length: NUM.MAX_RANDOM },
            (value, index) => index + 1
        );
        shuffle(lotto);

        return lotto.slice(0, 7);
    }

    getMultipleLotto(num) {
        return Array.from({ length: num }).map(() => this.getLotto());
    }
}

export default Lotto;
