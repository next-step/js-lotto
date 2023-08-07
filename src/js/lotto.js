const LottoValidator = require('../utils/validate.js')
const { LOTTO_PRICE, PRIZES, RESULT_MESSAGE } = require('./constants.js')
const LottoNumbers = require('./LottoNumbers.js')

const Lotto = {
    lottos: [],
    // 로또 구입 금액을 입력 받는 함수
    getLottoPurchaseAmount(amount) {
        this.amount = amount;
        this.amount = LottoValidator.amountValidate(amount)
        this.buyLotto(this.amount);
    },

    // 구입 금액에 해당하는 만큼 로또를 발행하는 함수
    buyLotto(purchaseAmount) {
        const numLottos = Math.floor(purchaseAmount / LOTTO_PRICE);
        LottoNumbers.getNumbers(numLottos);
    },

    // 로또 당첨 내역 및 수익률을 출력하는 함수
    showResult(winningNumbers, bonusNumber) {
        const results = [];
        this.lottos.forEach(lottoNumbers => {
            const matchedNumbers = lottoNumbers.filter(num => winningNumbers.includes(num));
            const numMatches = matchedNumbers.length;
            let rank = null;

            if (numMatches === 6) rank = "1등";
            else if (numMatches === 5 && lottoNumbers.includes(bonusNumber)) rank = "2등";
            else if (numMatches === 5) rank = "3등";
            else if (numMatches === 4) rank = "4등";
            else if (numMatches === 3) rank = "5등";

            results.push(rank);
        });

        const numOfWinners = results.filter(rank => rank !== null).length;
        const totalPrize = numOfWinners * LOTTO_PRICE;

        console.log(RESULT_MESSAGE.RESULT);
        results.forEach((rank, index) => {
            if (rank !== null) {
                console.log(RESULT_MESSAGE.RESULT_COUNT(index, rank));
            } else {
                console.log(RESULT_MESSAGE.RESULT_COUNT_NULL(index));
            }
        });
        console.log(RESULT_MESSAGE.RESULT_AMOUNT(totalPrize));
        console.log(RESULT_MESSAGE.RESULT_RATE(totalPrize, this.lottos));

        // Display specific prizes for each rank
        PRIZES.forEach(prize => {
            const numMatches = results.filter(rank => rank === prize.rank).length;
            if (numMatches > 0) {
                console.log(`${prize.rank}: ${prize.prize}`);
            }
        });
    },
}
module.exports = Lotto;
