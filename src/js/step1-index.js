const readline = require('readline')
const Lotto = require('./lotto')

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
    const amount = parseInt(await getUserInput('구입금액을 입력해 주세요: '), 10);
    Lotto.getLottoPurchaseAmount(amount);

    const winningNumbers = (await getUserInput('당첨 번호를 입력해 주세요: ')).split(',').map(Number);
    const bonusNumber = parseInt(await getUserInput('보너스 번호를 입력해 주세요: '), 10);
    Lotto.showResult(winningNumbers, bonusNumber)

    const restart = await getUserInput('\n다시 시작하시겠습니까? (y/n): ');
    if (restart.toLowerCase() === 'y') {
        startGame();
    } else {
        rl.close();
    }
}

startGame();