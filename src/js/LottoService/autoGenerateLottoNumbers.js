import {
    COUNT_NUMBERS_PER_TICKET,
    MAX_NUMBER,
    MIN_NUMBER,
} from "../constants/constants.js";
import { makeNonDuplicatedRandomNumbers } from "./makeNonDuplicatedRandomNumbers.js";

export function autoGenerateLottoNumbers(lottoCounts) {
    return Array(lottoCounts)
        .fill(null)
        .map((_) => {
            const randomNumbers = makeNonDuplicatedRandomNumbers(
                COUNT_NUMBERS_PER_TICKET,
                MIN_NUMBER,
                MAX_NUMBER
            );
            return {
                normalNumbers: randomNumbers.slice(0, randomNumbers.length - 1),
                bonusNumber: randomNumbers[randomNumbers.length - 1],
            };
        });
}

export default autoGenerateLottoNumbers;