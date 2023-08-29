const { RESULT_MESSAGE } = require('../utils/constants.js')

const PrintView = {
    printResult(resultCounts, profitPercentage) {
        console.log(RESULT_MESSAGE.RESULT);
        console.log(RESULT_MESSAGE.LINE);
        resultCounts.forEach(rank => {
            console.log(RESULT_MESSAGE.RESULT_COUNT(rank.text, rank.count));
        });
        console.log(RESULT_MESSAGE.RESULT_RATE(profitPercentage.toFixed(2)));
    }
}
module.exports = PrintView;