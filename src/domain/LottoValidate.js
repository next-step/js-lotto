import { LOTTO } from "../constant";
import {
  isEqualLength,
  isInRange,
  isNaturalNumber,
  hasDuplicateNumbers,
} from "../utils/validation";

export const validateNumberCount = (numbers) => {
  console.log(numbers);
  if (!isEqualLength(numbers, LOTTO.NUMBER_COUNT)) {
    throw new Error("로또 번호는 6개여야 합니다.");
  }
};

export const validateNumberInRange = (num) => {
  if (!isInRange(num, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)) {
    throw new Error(
      `모든 로또의 번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}사이의 수 입니다.`
    );
  }
};

export const validateNaturalNumber = (num) => {
  if (!isNaturalNumber(num)) {
    throw new Error("모든 로또의 번호는 자연수여야 합니다.");
  }
};

export const validateUniqueNumber = (numbers) => {
  if (hasDuplicateNumbers(numbers)) {
    throw new Error("중복된 번호가 있습니다.");
  }
};
