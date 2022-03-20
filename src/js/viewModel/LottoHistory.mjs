export default class LottoHistory {
    #elHistoryCount;

    #elHistoryDetail;

    #elHistoryDetailToggle;

    constructor() {
        this.#elHistoryCount = document.querySelector('.history__count')
        this.#elHistoryDetail = document.querySelector('.history__detail')
        this.#elHistoryDetailToggle = document.querySelector('.lotto-numbers-toggle-button')
        this.#elHistoryDetailToggle.addEventListener('click', this.#handleHistoryDetailClick)
    }

    #handleHistoryDetailClick = ({target: { checked }}) => {
        this.#elHistoryDetail.classList[checked ? 'remove' : 'add']('history__detail--simplified')
    }

    #historyTemplate(lotto) {
        return `<span class="mx-1 text-4xl history__detail__row">🎟️  <span class="history__detail__numbers">${lotto.join(', ')}</span></span>`
    }

    render(history) {
        this.#elHistoryCount.innerHTML = history.length;
        this.#elHistoryDetail.innerHTML = history.map(this.#historyTemplate).join('')
    }
}
