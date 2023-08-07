const LottoNumbers = {
    // 1부터 45까지의 숫자 중 6개를 랜덤으로 선택하는 함수
    generateRandomNumbers() {
        const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
        const randomNumbers = [];

        while (randomNumbers.length < 6) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomNumber = numbers.splice(randomIndex, 1)[0];
            randomNumbers.push(randomNumber);
        }

        return randomNumbers.sort((a, b) => a - b);
    },
    getNumbers(numLottos) {
        for (let i = 0; i < numLottos; i++) {
            const lottoNumbers = this.generateRandomNumbers(numLottos);
            console.log(lottoNumbers)
            this.lottos.push(lottoNumbers);
        }
        console.log(`${numLottos}개를 구매했습니다.`);
    }
}

module.exports = LottoNumbers;