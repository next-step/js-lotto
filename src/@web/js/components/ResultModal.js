import {LOTTO_INFO} from "../../../consts/Lotto";

export default class ResultModal {
    #$modal;
    #$modalCloseButton;
    #$resultTable;
    #$profitRate;
    #state = {
        resultSummary: [],
        profitRate: 0
    }
    constructor({$target}) {
        this.#$modal = $target;
        this.#$modalCloseButton = this.#$modal.querySelector(".modal-close");
        this.#$resultTable = this.#$modal.querySelector(".result-table");
        this.#$profitRate = this.#$modal.querySelector(".profit-rate");
        this.#$modalCloseButton.addEventListener("click", this.#closeModal.bind(this));
    }

    setState(nextState) {
        this.#state = {
            ...this.#state,
            ...nextState
        };
        console.log(this.#state)
    }

    openModal() {
        this.#renderResultTable();
        this.#renderProfitRate();
        this.#$modal.classList.add("open");
    }

    #closeModal() {
        this.#$modal.classList.remove("open");
    }

    #renderResultTable() {
        console.log(this.#state.resultSummary)
        this.#$resultTable.innerHTML = `
             <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                ${this.#state.resultSummary.map(result => this.#renderResultRow(result)).join("")}
              </tbody>
        `;
    }

    #renderResultRow(result) {
        return `
            <tr class="text-center">
                <td class="p-3">${result.match}개 ${result.bonus ? `+ 보너스볼` : ""}</td>
                <td class="p-3">${LOTTO_INFO.PRIZE[result.rank].toLocaleString()}</td>
                <td class="p-3">${result.count}개</td>
            </tr>
        `;
    }

    #renderProfitRate() {
        this.#$profitRate.innerText = `당신의 총 수익률은 ${this.#state.profitRate}%입니다.`;
    }
}