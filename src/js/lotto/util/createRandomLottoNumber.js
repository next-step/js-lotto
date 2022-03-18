export const createRandomLottoNumber = (count) => {
  const lottoRandomNumbers = []
  
  const generateRandomNumbers = () => {
    return  [ (Math.floor(Math.random() * 45) + 1),
        ' ' + (Math.floor(Math.random() * 45) + 1),
        ' ' + (Math.floor(Math.random() * 45) + 1),
        ' ' + (Math.floor(Math.random() * 45) + 1),
        ' ' + (Math.floor(Math.random() * 45) + 1),
        ' ' + (Math.floor(Math.random() * 45) + 1),
      ]
  }
  
  for (let i = 0; i < count; i++) {
    while (true) {
      const randomNumbers = generateRandomNumbers()
      const temp = randomNumbers.map(randomNumber => Number(randomNumber))
      const set = new Set(temp)
      if (temp.length === set.size) {
        lottoRandomNumbers.push(randomNumbers)
        break
      }
    }
  }
    
  return lottoRandomNumbers
}
