import { LOTTO_LENGTH, LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from '../constants/lotto.js';

export default function validateLotto(numbers) {
  if (numbers.length !== LOTTO_LENGTH) throw new Error(`Lotto should have ${LOTTO_LENGTH} numbers`);

  const isOutOfRangeNumber =
    numbers.filter(number => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER).length > 0;
  if (isOutOfRangeNumber)
    throw new Error(`Lottos number should be between ${LOTTO_MIN_NUMBER} and ${LOTTO_MAX_NUMBER}.`);

  const hasDuplicateNumber = new Set(numbers).size !== LOTTO_LENGTH;
  if (hasDuplicateNumber) throw new Error('Lotto should not have duplicate numbers');
}
