import { SELECTED_NUMS_LENGTH } from '../../constants/conditions.js'

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
  isDuplicated(target) {
    if (!Array.isArray(target)) return false

    const targetSet = new Set(target)

    return target?.length !== targetSet?.size
  },
  numberRange(target, condition = { min: 1, max: 45 }) {
    // 배열일 경우
    if (Array.isArray(target) && target.length) {
      return target.every(
        (num) =>
          typeof num === 'number' &&
          condition.min <= num &&
          num <= condition.max,
      )
    }
    // 단일 숫자일 경우
    else if (typeof target === 'number') {
      return target >= condition.min && target <= condition.max
    }
    return false
  },
}
