import Lotto from './tests/Lotto';
import Winning from './tests/Winning';
import { WinningRank } from './tests/constant';

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
	const lottoNumbers = [];

	const purchaseAmount = await readLineAsync('구입금액을 입력해 주세요. > ');
	const quantity = lotto.purchase(purchaseAmount);

	for (let i = 0; i < quantity; i++) {
		lottoNumbers.push(lotto.createLottoNumbers());
	}

	console.log(`${quantity}개를 구매했습니다.`);

	for (let i = 0; i < lottoNumbers.length; i++) {
		console.log(`[${lottoNumbers[i].join(', ')}]`);
	}

	const winningNumbersInput = await readLineAsync('당첨 번호를 입력해 주세요.');
	const winningNumbers = winningNumbersInput.split(',').map(Number);

	const bonusNumberInput = await readLineAsync('보너스 번호를 입력해 주세요.');
	const bonusNumber = Number(bonusNumberInput);

	const { prizeCounts, totalPrize } = Winning.calculateResults(lottoNumbers, winningNumbers, bonusNumber);
	const winningRate = (totalPrize / purchaseAmount) * 100;

	console.log(`
당첨 통계
--------------------
3개 일치 (5,000원) - ${prizeCounts[WinningRank.FIFTH_PLACE]}개
4개 일치 (50,000원) - ${prizeCounts[WinningRank.FOURTH_PLACE]}개
5개 일치 (1,500,000원) - ${prizeCounts[WinningRank.THIRD_PLACE]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${prizeCounts[WinningRank.SECOND_PLACE]}개
6개 일치 (2,000,000,000원) - ${prizeCounts[WinningRank.FIRST_PLACE]}개
총 수익률은 ${winningRate.toFixed(1)}%입니다.
`);
}

play();
