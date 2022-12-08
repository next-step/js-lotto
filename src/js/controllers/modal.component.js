import { $modal } from "../views/selector.js";
import { Component } from "./component.js";
import { WINSTATS } from "../utils/const.js";
import { arrDeepCopy, getRateOfReturn } from "../utils/util.js";

export class ModalComponent extends Component {
    numberSet;
    lastNumbers;
    lastBonusNumber;
    price;
    #winStats;
    #rateOfReturn;

    constructor(container) {
        super(container);
        this.numberSet = this._stateModel.getState('numberSet');
        this.lastNumbers = this._stateModel.getState('lastNumbers');
        this.lastBonusNumber = this._stateModel.getState('lastBonusNumber');
        this.price = this._stateModel.getState('price');
        this.#winStats = arrDeepCopy(WINSTATS);
        this.#rateOfReturn = 0;
        this.init();
    }

    init() {
        super.init();
        this._view.displayFlex([$modal.modal]);
        this.#renderStats();
    }

    _setEventListeners() {
        $modal.resetButton.addEventListener('click', () => this._restart());
        $modal.modalOuter.addEventListener('click', () => this.#closeStatsModal());
        $modal.closeButton.addEventListener('click', () => this.#closeStatsModal());
    }

    _restart() {
        this._stateModel.setState({ restart: true });
        this.#closeStatsModal();
        this._reset();
        this._stateModel.reset();
    }

    _reset() {
        this._view.renderToReplaceInnerHTML($modal.resultTable);
        this._view.renderToReplaceInnerHTML($modal.totalRateOfReturn);
        this.#winStats = arrDeepCopy(WINSTATS);
        this.#rateOfReturn = 0;
    }

    #closeStatsModal() {
        this._view.displayNone([$modal.modal]);
    }

    #renderStats() {
        this._reset();
        this.#getStats();
        this.#getRateOfReturn();

        this.#winStats.forEach(stats => {
            const unit = stats.isBonus ? '5개 + 보너스볼' : `${stats.matching}개`;
            const prize = stats.prize.toLocaleString('en-US');
            const element = `<tr class="text-center">
                                <td class="p-3">${ unit }</td>
                                <td class="p-3">${ prize }</td>
                                <td class="p-3">${ stats.tickets }개</td>
                            </tr>`;
            this._view.renderToAddInnerHTML($modal.resultTable, element);
        })
        this._view.renderToReplaceInnerHTML($modal.totalRateOfReturn, `당신의 총 수익률은 ${this.#rateOfReturn}%입니다.`);
    }

    #getStats() {
        const matches = this.#getMatches();
        matches.forEach(match => {
            if (match.matching < 3) return;
            const matchStats = this.#winStats
                .find(row =>
                    row.isBonus === match.isBonus &&
                    row.matching === match.matching)
            if (!!matchStats) matchStats.tickets += 1;
        })
    }

    #getRateOfReturn = () => {
        const paid = this.#winStats.reduce((r, rate) => r += rate.prize * rate.tickets, 0);
        const pay = this.price;
        this.#rateOfReturn = getRateOfReturn(paid, pay);
    }

    #getMatches = () => {
        return this.numberSet.map(set => {
            return set.reduce((r, num) => {
                const index = this.lastNumbers.indexOf(num);
                const isBonus = num === this.lastBonusNumber;
                if (isBonus) r.isBonus = true;
                else if (index > -1) r.matching += 1;
                return r;
            }, { matching: 0, isBonus: false })
        })
    }
}