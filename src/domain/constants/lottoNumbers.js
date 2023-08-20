export const MAX_LOTTO_NUMBER = 45;
export const MIN_LOTTO_NUMBER = 1;

export const LOTTO_NUMBERS = Array.from({length: MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER}, (_, i) => i + MIN_LOTTO_NUMBER);
