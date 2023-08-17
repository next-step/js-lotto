export const isNumber = num => {
  return !isNaN(num) && isFinite(num) && typeof num === 'number'
}
