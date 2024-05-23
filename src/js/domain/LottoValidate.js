import { LOTTO_PRICE } from "./LottoService";
import { LOTTO_DIGITS, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER } from "./Lotto";
import { LottoRank } from "./enum/LottoRank";

export const checkMoney = (money) => {
  if (!Number.isInteger(money)) {
    throw new Error("정수가 아닙니다.");
  }

  if (money < LOTTO_PRICE) {
    throw new Error(`구입금액은 ${LOTTO_PRICE}원 이상이어야 합니다.`);
  }
};

export const checkNumbers = (numbers) => {
  if (numbers.length !== LOTTO_DIGITS) {
    throw new Error(`로또(당첨) 번호의 자리수는 ${LOTTO_DIGITS}자리입니다.`);
  }

  if (numbers.length !== new Set(numbers).size) {
    throw new Error("중복된 번호가 있습니다.");
  }

  if (!numbers.every((e) => e >= LOTTO_MIN_NUMBER && e <= LOTTO_MAX_NUMBER)) {
    throw new Error(
      `로또(당첨) 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
    );
  }
};

export const checkBonusNumber = (bonusNumber) => {
  if (!Number.isInteger(bonusNumber)) {
    throw new Error(
      `보너스 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
    );
  }

  if (bonusNumber < LOTTO_MIN_NUMBER || bonusNumber > LOTTO_MAX_NUMBER) {
    throw new Error(
      `보너스 번호는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 수입니다.`
    );
  }
};

export const checkLottoRanks = (lottoRanks) => {
  if (lottoRanks.some((e) => !Object.values(LottoRank).includes(e))) {
    throw new Error("LottoRank enum에 정의되지 않은 값입니다.");
  }
};
