import Lotto from './tests/Lotto';

const readline = require('readline');

function readLineAsync(query) {
	return new Promise(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(query, input => {
			rl.close();
			resolve(input);
		});
	});
}

async function play() {
	const lotto = new Lotto();
	const winningNumbers = [];

	const purchaseAmount = await readLineAsync('구입금액을 입력해 주세요. > ');
	const quantity = lotto.purchase(purchaseAmount);

	for (let i = 0; i < quantity; i++) {
		winningNumbers.push(lotto.getWinningNumbers());
	}

	console.log(`${quantity}개를 구매했습니다.`);

	for (let i = 0; i < winningNumbers.length; i++) {
		console.log(`[${winningNumbers[i].join(', ')}]`);
	}
}

play();
