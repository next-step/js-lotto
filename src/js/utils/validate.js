export const validate = {
  isValidPositiveNumber(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return false
    }

    const num = Number(value)
    return num > 0 && !isNaN(num) && isFinite(num)
  },
}
