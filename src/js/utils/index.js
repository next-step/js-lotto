export const range = number => Array.from({ length: number }, (_, i) => i + 1);

export const size = (array = []) => array.length;

export const successOrFailureCurry = value => (success, failure) => {
  try {
    return success(value);
  } catch (e) {
    return failure(e);
  }
};

export const sum = (a, b) => a + b;
