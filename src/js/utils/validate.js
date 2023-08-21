import { SELECTED_NUMS_LENGTH } from '../../constants/conditions'

export const validate = {
  isPositiveNumber(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return false
    }

    const num = Number(value)
    return num > 0 && !isNaN(num) && isFinite(num)
  },
  length(target, requiredLength = SELECTED_NUMS_LENGTH) {
    if (!Array.isArray(target)) return false

    if (target.length === requiredLength) {
      return true
    }
    return false
  },
  isNotDuplicated(target) {
    if (!Array.isArray(target)) return false

    const targetSet = new Set(target)
    if (target?.length === targetSet?.size) {
      return true
    }
    return false
  },
  numberRange(target, condition = { min: 1, max: 45 }) {
    // target이 배열일 때
    if (
      target?.every(
        (num) =>
          typeof num === 'number' &&
          condition.min <= num &&
          num <= condition.max,
      )
    ) {
      return true
    }
    // target 이 단일 숫자일 때
    else if (target >= condition.min && target <= condition.max) {
      return true
    }

    return false
  },
}
