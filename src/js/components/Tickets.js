export const Tickets = ($el, tickets) => {

    const state = {
        isShowNumbers: false,
    };

    function switchShowNumbers() {
        state.isShowNumbers = !state.isShowNumbers;
        renderLottoNumbers($el.querySelector('[data-component="lotto-numbers"]'));
    };

    function render() {
        const ticketsWrap = document.createElement('div');
        ticketsWrap.setAttribute('data-component', $el.getAttribute('data-component'));
        ticketsWrap.insertAdjacentHTML('beforeend', `
            <section class="mt-9">
                <div class="d-flex">
                    <label class="flex-auto my-0" data-test="tickets-count">총 ${tickets.length}개를 구매하였습니다.</label>
                    <div class="flex-auto d-flex justify-end pr-1">
                        <label class="switch" data-test="number-detail-switch">
                            <input type="checkbox" class="lotto-numbers-toggle-button" data-test="amount-input"/>
                            <span class="text-base font-normal">번호보기</span>
                        </label>
                    </div>
                </div>
                <div data-component="lotto-numbers"><div>
            </section>
        `);
        ticketsWrap.querySelector('.switch')
                   .addEventListener('change', switchShowNumbers);

        renderLottoNumbers(ticketsWrap.querySelector('[data-component="lotto-numbers"]'));

        $el.replaceWith(ticketsWrap);
        $el = ticketsWrap;
    }

    function renderLottoNumbers($lottoNumbers) {
        const {isShowNumbers} = state;
        const lottoNumbersWrapClassNames = ['d-flex', 'flex-wrap', isShowNumbers && 'flex-col'];
        const lottoDetailClassNames = ['lotto-detail', isShowNumbers ? 'd-inline' : 'd-none'];

        const lottoNumbers = tickets.map(({normalNumbers}) => {
            return `
                <li class="mx-1 text-4xl lotto-wrapper" data-test="lotto-number">
                    <span class="lotto-icon">🎟️ </span>
                    <span class="${lottoDetailClassNames.join(' ')}" data-test="lotto-number-detail">${normalNumbers.join(', ')}</span>
                </li>
            `;
        });

        const lottoNumbersWrap = document.createElement('div');
        lottoNumbersWrap.setAttribute('data-component', $lottoNumbers.getAttribute('data-component'));
        lottoNumbersWrap.insertAdjacentHTML('beforeend', `
            <ul id="lotto-icons" class="${lottoNumbersWrapClassNames.join(' ')}">
                ${lottoNumbers.join('')}
            </ul>
        `);

        $lottoNumbers.replaceWith(lottoNumbersWrap);
    }

    render();
};
