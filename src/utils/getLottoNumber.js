const getLottoNumber = () => {
  const lottoNumbers = []

  while (lottoNumbers.length < 7) {
    const number = Math.floor(Math.random() * 100) + 1

    if (lottoNumbers.indexOf(number) === -1) {
      lottoNumbers.push(number)
    }
  }

  return lottoNumbers
}

export { getLottoNumber }
