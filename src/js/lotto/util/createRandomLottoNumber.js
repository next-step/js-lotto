// 함수 이름 => 6개의 숫자로 주는지 모호한 이름!
// 인자로 받아서 해결을 해볼까? (숫자의 범위를 인자로 받을 것)

export const createRandomLottoNumber = (count) => {
  const lottoRandomNumbers = []
  
  // 1 ~ 45 
  // 시간복잡도를 알 수 있는 방법
  for (let i = 0; i < count; i++) {
    while (true) {
      const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1)
      const temp = randomNumbers
      const set = new Set(randomNumbers)
      if (temp.length === set.size) {
        lottoRandomNumbers.push(`${randomNumbers}`.replaceAll(',', ', '))
        break
      }
    }
  }
  console.log('in')
  return lottoRandomNumbers
}
