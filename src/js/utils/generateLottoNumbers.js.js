const randomNumber = () => Math.floor(Math.random() * 45) + 1

export const generateLottoNumbers = (count = 6) => {
  let randomNumbers = new Set()

  while (randomNumbers.size < count) {
    const number = randomNumber()

    if (!randomNumbers.has(number)) {
      randomNumbers.add(number)
    }
  }

  return [...randomNumbers].sort((a, b) => a - b)
}
