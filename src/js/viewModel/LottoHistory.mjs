export default class LottoHistory {
    #elHistoryCount;

    #elHistoryDetail;

    #elHistoryDetailToggle;

    constructor() {
        this.#elHistoryCount = document.querySelector('.history__count')
        this.#elHistoryDetail = document.querySelector('.history__detail')
        this.#elHistoryDetailToggle = document.querySelector('.lotto-numbers-toggle-button')
        this.#addEventListener();
    }

    #addEventListener() {
        this.#elHistoryDetailToggle.addEventListener('click', this.#handleHistoryDetailClick)
    }

    #handleHistoryDetailClick = () => {
        this.#elHistoryDetail.classList.toggle('history__detail--simplified')
    }

    static historyTemplate(lotto) {
        return `<span class="mx-1 text-4xl history__detail__row">🎟️  <span class="history__detail__numbers">${lotto.join(', ')}</span></span>`
    }

    render(history) {
        this.#elHistoryCount.innerHTML = history.length;
        this.#elHistoryDetail.innerHTML = history.map(LottoHistory.historyTemplate).join('')
    }
}
