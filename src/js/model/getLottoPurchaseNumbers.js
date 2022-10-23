function getLottoPurchaseNumbers(amount, unit = 1000) {
  return Math.floor(Number(amount) / unit);
}

export default getLottoPurchaseNumbers;