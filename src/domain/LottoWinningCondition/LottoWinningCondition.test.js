import {LOTTO_INFO} from "../../consts/Lotto.js";
import LottoWinningCondition from "./LottoWinningCondition.js";

const ERROR_NUMBER = "46";
const WINNING_NUMBERS = `1,2,3,4,5,6`;
const BOUNUS_NUMBER = `7`;
const WINNING_NUMBERS_ERROR = `1,2,3,4,5,${ERROR_NUMBER}`;
const DUPLICATE_WINNING_NUMBERS = `1,2,3,4,5,5`;
const DUPLICATE_BONUS_NUMBER = `1`;

describe('로또 당첨 조건', () => {
    context('로또 당첨 조건 생성 시', () => {
        it("당첨 번호들 중에 로또 숫자 범위를 벗어나는 숫자가 있으면 에러를 발생한다.", () => {
            expect(() => {
                new LottoWinningCondition(WINNING_NUMBERS_ERROR, BOUNUS_NUMBER);
            }).toThrowError(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
        })
        it("보너스 번호가 로또 숫자 범위를 벗어나면 에러를 발생한다.", () => {
            expect(() => {
                new LottoWinningCondition(WINNING_NUMBERS, ERROR_NUMBER);
            }).toThrowError(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
        })
        it("당첨 번호들 중에 중복된 숫자가 있으면 에러를 발생한다.", () => {
            expect(() => {
                new LottoWinningCondition(DUPLICATE_WINNING_NUMBERS, BOUNUS_NUMBER);
            }).toThrowError("당첨 번호는 중복될 수 없습니다.");
            expect(() => {
                new LottoWinningCondition(WINNING_NUMBERS, DUPLICATE_BONUS_NUMBER);
            }).toThrowError("당첨 번호는 중복될 수 없습니다.");
        });
    });
});