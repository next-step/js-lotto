function generateRandomNumber(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError("min과 max는 number 타입이어야 합니다.");
  }

  if (min > max) {
    throw new RangeError("min은 max보다 작거나 같아야 합니다.");
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default generateRandomNumber;
