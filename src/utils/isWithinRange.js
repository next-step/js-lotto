function isWithinRange(numbers, max, min) {
  const values = Array.isArray(numbers) ? numbers : [numbers];
  return Math.max(...values, max) <= 45 && Math.min(...values, min) >= 1;
}

export default isWithinRange;
