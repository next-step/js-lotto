function makeLotto() {
  const balls = new Array(45).fill(null).map((value, index) => index + 1);
  const lottos = new Array(6).fill(null).map(() => {
    const ballIndex = Math.floor(Math.random() * (balls.length - 1));
    return balls.splice(ballIndex, 1)[0];
  });
  return lottos;
}

function validateLotto(numbers) {
  if (numbers.length !== 6) throw new Error('Lotto should have 6 numbers');

  const isOutOfRangeNumber = numbers.filter(number => number < 1 || number > 45).length > 0;
  if (isOutOfRangeNumber) throw new Error('Lottos number should be between 1 and 45.');

  const hasDuplicateNumber = new Set(numbers).size !== 6;
  if (hasDuplicateNumber) throw new Error('Lotto should not have duplicate numbers');
}

export { makeLotto, validateLotto };
