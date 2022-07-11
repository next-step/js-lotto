const LOTTO_MAX_NUMBER = 45;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_LENGTH = 6;

function makeLotto() {
  const balls = new Array(LOTTO_MAX_NUMBER).fill(null).map((value, index) => index + 1);
  const lotto = new Array(LOTTO_LENGTH).fill(null).map(() => {
    const ballIndex = Math.floor(Math.random() * (balls.length - 1));
    return balls.splice(ballIndex, 1)[0];
  });
  return lotto;
}

function validateLotto(numbers) {
  if (numbers.length !== LOTTO_LENGTH) throw new Error(`Lotto should have ${LOTTO_LENGTH} numbers`);

  const isOutOfRangeNumber =
    numbers.filter(number => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER).length > 0;
  if (isOutOfRangeNumber)
    throw new Error(`Lottos number should be between ${LOTTO_MIN_NUMBER} and ${LOTTO_MAX_NUMBER}.`);

  const hasDuplicateNumber = new Set(numbers).size !== LOTTO_LENGTH;
  if (hasDuplicateNumber) throw new Error('Lotto should not have duplicate numbers');
}

export { makeLotto, validateLotto };
