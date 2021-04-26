const NumberArr = Array.from({ length: 45 }, (v, i) => i + 1)

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export const getTicket = () => {
  return shuffleArray(NumberArr).slice(0, 6)
}
