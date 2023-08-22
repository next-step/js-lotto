const { RESULT_MESSAGE } = require('./constants.js')

const View = {
    printResult(resultCounts, profitPercentage) {
        console.log(RESULT_MESSAGE.RESULT);
        console.log(RESULT_MESSAGE.LINE);
        resultCounts.forEach(rank => {
            console.log(RESULT_MESSAGE.RESULT_COUNT(rank.text, rank.count));
        });
        console.log(RESULT_MESSAGE.RESULT_RATE(profitPercentage.toFixed(2)));
    }
}
module.exports = View;