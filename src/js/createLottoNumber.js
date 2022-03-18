export const createlottoRandomNumber = (count) => {
  const lottoRandomNumbers = []
  // 6번 통으로 
  const generateRandomNumbers = () => {
    return  [ String((Math.floor(Math.random() * 45) + 1)),
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
      const temp = randomNumbers.map(e => parseInt(e.trim()))
      const set = new Set(temp)
      if (temp.length === [...set].length) {
        lottoRandomNumbers.push(randomNumbers)
        break
      }
    }
  }
    
  return lottoRandomNumbers
}
