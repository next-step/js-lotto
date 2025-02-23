class DuplicatedLottoNumber extends Error {
  constructor() {
    super("로또 번호는 중복될 수 없습니다.");
  }
}

class InvalidLottoLength extends Error {
  constructor(requiredLength) {
    super(`로또 번호는 ${requiredLength}개를 입력해 주세요.`);
  }
}

class InvalidLottoRange extends Error {
  constructor(min, max) {
    super(`${min} 이상 ${max} 이하 숫자를 입력해 주세요.`);
  }
}

class InvalidLottoType extends Error {
  constructor() {
    super("로또 번호는 숫자만 입력 가능합니다.");
  }
}

export default class LottoNumbers {
  static LOTTO_SELECTION_COUNT = 6;
  static NUMBER_MIN_RANGE = 1;
  static NUMBER_MAX_RANGE = 45;

  #numbers = [];

  constructor({
    numbers,
    count = LottoNumbers.LOTTO_SELECTION_COUNT,
    min = LottoNumbers.NUMBER_MIN_RANGE,
    max = LottoNumbers.NUMBER_MAX_RANGE,
  }) {
    LottoNumbers.validateLottoNumbers(numbers, count, min, max);
    this.#numbers = numbers;
  }

  static validateLottoNumbers(numbers, count, min, max) {
    LottoNumbers.validateNumberType(numbers);
    LottoNumbers.validateDuplication(numbers);
    LottoNumbers.validateNumberLength(numbers, count);
    LottoNumbers.validateNumberRange(numbers, min, max);
  }

  static validateNumberType(numbers) {
    if (numbers.some((number) => !Number.isInteger(number))) {
      throw new InvalidLottoType();
    }
  }

  static validateDuplication(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new DuplicatedLottoNumber();
    }
  }

  static validateNumberLength(numbers, count) {
    if (numbers.length !== count) {
      throw new InvalidLottoLength(count);
    }
  }

  static validateNumberRange(numbers, min, max) {
    if (numbers.some((number) => number < min || number > max)) {
      throw new InvalidLottoRange(min, max);
    }
  }

  getMatchCount(numbers) {
    return this.#numbers.filter((num) => numbers.includes(num)).length;
  }

  get values() {
    return [...this.#numbers];
  }
}
