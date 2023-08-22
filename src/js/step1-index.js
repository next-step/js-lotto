const readline = require('readline')
const Lotto = require('./lotto')
const { RESULT_MESSAGE } = require('./constants.js')
const LottoValidator = require('../utils/validate.js')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getUserInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function startGame() {
    const amount = parseInt(await getUserInput(RESULT_MESSAGE.INPUT), 10);
    Lotto.getLottoPurchaseAmount(amount);

    const winningNumbers = LottoValidator.checkWinningNumbers((await getUserInput(RESULT_MESSAGE.PUT_WIN_NUMBER)).split(',').map(Number));
    const bonusNumber = LottoValidator.checkBonusNumber(parseInt(await getUserInput(RESULT_MESSAGE.PUT_BONUS_NUMBER), 10));
    Lotto.matchedRank(winningNumbers, bonusNumber)

    const restart = await getUserInput(RESULT_MESSAGE.RESTART);
    if (restart.toLowerCase() === 'y') {
        startGame();
    } else {
        rl.close();
    }
}

startGame();