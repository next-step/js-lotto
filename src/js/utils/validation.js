import { curry } from "./fx.js";

const validation = {
  isNumber: curry((value) => {
    if (typeof value !== "number" || !isNaN(value)) {
      throw new TypeError("숫자를 입력해주세요.");
    }

    return value;
  }),

  isInteger: curry((value) => {
    if (!Number.isInteger(value)) {
      throw new TypeError("정수를 입력해주세요.");
    }

    return value;
  }),

  isInRange: curry((min, max, value) => {
    if (value < min || value > max) {
      throw new RangeError(`${min} ~ ${max} 사이의 값을 입력해주세요.`);
    }

    return value;
  }),

  isUniqueArray: curry((array) => {
    if (new Set(array).size !== array.length) {
      throw new RangeError("중복되지 않은 값을 입력해주세요.");
    }
    return array;
  }),

  isArrayOfSize: curry((size, array) => {
    if (array.length !== size) {
      throw new RangeError(`${size}개의 값을 입력해주세요.`);
    }

    return array;
  }),

  isArrayOfType: curry((typeCheckFn, array) => {
    if (array.some((item) => !typeCheckFn(item))) {
      throw new TypeError("배열 요소는 타입 체크를 만족해야 합니다.");
    }

    return array;
  }),

  isNotIncluded: curry((array, value) => {
    if (array.includes(value)) {
      throw new RangeError("포함되지 않은 값을 입력해주세요.");
    }

    return value;
  }),

  isIncluded: curry((array, value) => {
    if (!array.includes(value)) {
      throw new RangeError("포함된 값을 입력해주세요.");
    }

    return value;
  }),
};

export default validation;
