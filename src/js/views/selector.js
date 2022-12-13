export const $purchased = {
    lotto: document.querySelector('.purchased-lotto'),
    amount: document.getElementById('purchase-amount'),
    total: document.querySelector('.purchased-lotto-total'),
    button: document.querySelector('.purchase-button')
}

export const $purchasedManuel = {
    lotto: document.querySelector('.purchased-lotto-manuel'),
    set: document.querySelector('.purchased-lotto-manuel-set'),
    inputs: document.querySelectorAll('.purchased-lotto-manuel-inputs'),
    numbers: document.querySelectorAll('.manuel-number'),
    addButton: document.querySelector('.purchased-lotto-manuel-add'),
    deleteButton: document.querySelector('.purchased-lotto-manuel-delete'),
    button: document.querySelector('.purchase-lotto-button')
}

export const $issued = {
    tickets: document.querySelector('.lotto-tickets'),
    numberToggleButton: document.querySelector('.lotto-numbers-toggle-button')
}

export const $stats = {
    lotto: document.querySelector('.lotto-stats'),
    openModalButton: document.querySelector('.open-stats-modal-button'),
    lastNumbers: document.querySelectorAll('.winning-number'),
    lastBonusNumbers: document.querySelector('.bonus-number')
}

export const $modal = {
    modal: document.querySelector('.modal'),
    modalOuter: document.querySelector('.modal-outer'),
    resetButton: document.querySelector('.stats-reset-button'),
    closeButton: document.querySelector('.modal-close'),
    resultTable: document.querySelector('.stats-table-tbody'),
    totalRateOfReturn: document.querySelector('.stats-total')
}

export const $lottoManuel =
    `<div class="d-flex purchased-lotto-manuel-inputs">
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
        <input
                type="number"
                max="45"
                min="1"
                maxlength="2"
                class="manuel-number mx-1 text-center"/>
    </div>`;
