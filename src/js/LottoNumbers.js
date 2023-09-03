const { RESULT_MESSAGE ,LOTTO_RANDOM_MAX, LOTTO_RANDOM_LENGTH } = require('./utils/constants.js')

const LottoNumbers = {
    generateRandomNumbers() {
        const numbers = Array.from({ length: LOTTO_RANDOM_MAX }, (_, i) => i + 1);
        const randomNumbers = [];

        while (randomNumbers.length < LOTTO_RANDOM_LENGTH) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomNumber = numbers.splice(randomIndex, 1)[0];
            randomNumbers.push(randomNumber);
        }

        return randomNumbers.sort((a, b) => a - b);
    },

    getNumbers(numLottos) {
        const list = Array.from({ length: numLottos }, () => {
            const lottoNumbers = this.generateRandomNumbers();
            console.log(lottoNumbers);
            return lottoNumbers;
        });
        console.log(RESULT_MESSAGE.PURCHASE(numLottos));
        return list
    }
}

module.exports = LottoNumbers;