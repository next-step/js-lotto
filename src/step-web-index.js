/**
 * step 3의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoConfirm from './domain/LottoConfirm';
import LottoMachine from './domain/LottoMachine';
import { getLottoResults, writeLottoRateOfReturn, writeLottosResult } from './js/ResultLotto';
import { getBonusNumber, rsetBonusNumber } from './js/bonus';
import { displayLottoTickets, resetLottoTickets } from './js/diplayLotto';
import { getWinningNumbers, resetWinningNumbers } from './js/winningNumbers';
import { Message } from './js/message';
import Prices from './js/prices';
import { Toggle } from './js/toggle';
import { sortArray } from './utils';
console.log('Web Browser!');

const confirmButton = document.getElementById('confirmButton');
const toggleShowNumber = document.querySelector('.lotto-numbers-toggle-button');
const resultButton = document.querySelector('.open-result-modal-button');
const resetButton = document.getElementById('resetButton');

const machine = new LottoMachine();
const lottoConfirm = new LottoConfirm();
const prices = new Prices();
const purchaseLotto = new Message('purchase_message');
const Togglebutton = new Toggle('.lotto-numbers');

function handleClickBuyLottos() {
    machine.createLottos(prices.getPrice(), 'ASC', sortArray);
    purchaseLotto.render(`${machine.getLottos().length}개 구매하였습니다.`);
}

function handleToggleLottoNumbers() {
    Togglebutton.onClick(displayLottoTickets(machine));
}

function handleClickResult() {
    lottoConfirm.setWinningNumbers(getWinningNumbers());
    lottoConfirm.setBonusNumber(getBonusNumber());

    const lottoResult = lottoConfirm.checkLottoWinning(machine.getLottos());
    const percent = lottoConfirm.returnsLottos(prices.getPrice(), lottoResult);
    const result = getLottoResults(lottoResult);

    writeLottosResult(result);
    writeLottoRateOfReturn(percent);
}

function handleResetLottos() {
    prices.resetPrice();
    purchaseLotto.reset();
    resetLottoTickets();

    toggleShowNumber.checked = false;

    resetWinningNumbers();
    rsetBonusNumber();
    machine.resetLottos();
    lottoConfirm.resetLottoConfrim();
}

confirmButton.addEventListener('click', handleClickBuyLottos);
resultButton.addEventListener('click', handleClickResult);
toggleShowNumber.addEventListener('click', handleToggleLottoNumbers);
resetButton.addEventListener('click', handleResetLottos);
