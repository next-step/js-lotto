class LottoMachine {
  generateLottoNumbers() {
    const lottoNumbers = [];

    const numbers = Array(45)
      .fill(1)
      .map((v, i) => v + i);

    for (let i = 0; i < 7; i += 1) {
      const randomIndex = Math.floor(Math.random * numbers.length);
      lottoNumbers.push(numbers.splice(randomIndex, 1)[0]);
    }

    return lottoNumbers;
  }
}

export default LottoMachine;
