import {LOTTO_INFO} from "../../consts/Lotto.js";
import {Lotto} from "../Lotto/Lotto.js";
import {LottoList} from "../LottoList/LottoList.js";
import {getRandomNumber} from "../../utils/random.js";

//랜덤한 로또 생성을 담당하는 객체 (모든 요소가 랜덤하기 때문에 테스트할 필요는 없어보임)
class LottoFactory {
    static #createRandomLottoNumbers() {
        const lottoNumbers = [];
        while (lottoNumbers.length < LOTTO_INFO.SIZE) {
            const randomNumber = LottoFactory.#getRandomLottoNumber();
            if (!lottoNumbers.includes(randomNumber)) {
                lottoNumbers.push(randomNumber);
            }
        }
        return lottoNumbers;
    }

    static #getRandomLottoNumber() {
        return getRandomNumber(LOTTO_INFO.NUMBER_MIN, LOTTO_INFO.NUMBER_MAX);
    }

    static createLottoList(lottoCount) {
        return new LottoList(Array.from({length: lottoCount}, () => new Lotto(LottoFactory.#createRandomLottoNumbers())));
    }
}

export default LottoFactory;