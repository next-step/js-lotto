export const isNumber = num => {
  return !isNaN(num) && isFinite(num) && typeof num === 'number'
}

export const isInRange = (num, min, max) => {
  return num >= min && num <= max
}
