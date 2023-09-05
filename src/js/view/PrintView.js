const { RESULT_MESSAGE, LOTTO_PRICE } = require('../utils/constants.js')

const PrintView = {
    printResult(resultCounts, profitPercentage) {
        console.log(RESULT_MESSAGE.RESULT);
        console.log(RESULT_MESSAGE.LINE);
        resultCounts.forEach(rank => {
            console.log(RESULT_MESSAGE.RESULT_COUNT(rank.text, rank.count));
        });
        console.log(RESULT_MESSAGE.RESULT_RATE(profitPercentage.toFixed(2)));
    },

    calculatePrizes(lottos,prize) {
        let totalPrize = 0;
        prize.forEach(rank => {
            totalPrize += rank.count * rank.prize;
        })

        const totalInvestment = lottos.length * LOTTO_PRICE;
        const profitPercentage = ((totalPrize - totalInvestment) / totalInvestment) * 100;
        this.printResult(prize, profitPercentage)
    },
}
module.exports = PrintView;