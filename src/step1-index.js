import {LottoCompany} from "./domain/LottoCompany/LottoCompany.js";
import {LottoSeller} from "./domain/LottoSeller/LottoSeller.js";
import {Console} from "./util/Console.js";
import {LottoCustomer} from "./domain/LottoCustomer/LottoCustomer.js";
import {DEFAULT_LOTTO_INFO} from "./consts/lotto/lotto.const.js";



const inputMoney = () => new Promise((resolve) => Console.readLine("구입금액을 입력해 주세요. ", (userInput) => resolve(userInput)));
const inputWinningNumbers = () => new Promise((resolve) => Console.readLine("\n> 당첨 번호를 입력해 주세요. ", (userInput) => resolve(userInput)));
const inputBonusNumber = () => new Promise((resolve) => Console.readLine("\n> 보너스 번호를 입력해 주세요. ", (userInput) => resolve(userInput)));

const setLottoGame = () => {
    const lottoCompany = new LottoCompany(DEFAULT_LOTTO_INFO.PRICE, DEFAULT_LOTTO_INFO.PRIZE);
    const lottoSeller = new LottoSeller();
    const lottoCustomer = new LottoCustomer();
    lottoSeller.joinLottoCompany(lottoCompany);
    return {lottoCompany, lottoSeller, lottoCustomer};
}
const doLottoGame = async ({lottoCompany, lottoSeller, lottoCustomer}) => {
    const payedMoney = Number(await inputMoney());
    lottoCustomer.buyLotto(lottoSeller, payedMoney);
    Console.print(`${lottoCustomer.lottoList.length}개를 구매했습니다.`);
    lottoCustomer.lottoList.forEach(lotto => Console.print(lotto.lottoNumbers));

    const winningNumbers = (await inputWinningNumbers()).split(",").map(number => Number(number));
    const bonusNumber = Number(await inputBonusNumber());

    lottoCompany.checkLottoWinners(winningNumbers, bonusNumber);
}

const finishLottoGame = ({lottoCompany, lottoCustomer}) => {
    Console.print(`\n당첨 통계\n--------------------`);
    Console.print(`3개 일치 (${lottoCompany.getPrize(5)}원) - ${lottoCustomer.getWinnerCount(5)}개`);
    Console.print(`4개 일치 (${lottoCompany.getPrize(4)}원) - ${lottoCustomer.getWinnerCount(4)}개`);
    Console.print(`5개 일치 (${lottoCompany.getPrize(3)}원) - ${lottoCustomer.getWinnerCount(3)}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (${lottoCompany.getPrize(2)}원) - ${lottoCustomer.getWinnerCount(2)}개`);
    Console.print(`6개 일치 (${lottoCompany.getPrize(1)}원) - ${lottoCustomer.getWinnerCount(1)}개`);
    Console.print(`총 수익률은 ${lottoCustomer.getProfitRate()}%입니다.`);
    process.exit();
}

const lottoGame = async () => {
    const {lottoCompany, lottoSeller, lottoCustomer} = setLottoGame();
    await doLottoGame({lottoCompany, lottoSeller, lottoCustomer} );
    finishLottoGame({lottoCompany, lottoCustomer});
}

lottoGame();
