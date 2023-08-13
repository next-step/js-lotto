const { RESULT_MESSAGE } = require('./constants.js')

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
        let list = [];
        for (let i = 0; i < numLottos; i++) {
            const lottoNumbers = this.generateRandomNumbers(numLottos);
            console.log(lottoNumbers)
            list.push(lottoNumbers)
        }
        console.log(RESULT_MESSAGE.PURCHASE(numLottos));
        return list
    }
}

module.exports = LottoNumbers;