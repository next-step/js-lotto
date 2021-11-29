export const shuffle = (sequence) => {
  const _sequence = [...sequence];

  for (let i = _sequence.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [_sequence[i - 1], _sequence[j]] = [_sequence[j], _sequence[i - 1]];
  }
  return _sequence;
};

export const generateRamdomNumbers = (minValue, maxValue, length) => {
  const sequence = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue);
  const shuffled = shuffle(sequence);

  return shuffled.slice(0, length);
};
