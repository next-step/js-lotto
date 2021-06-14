/**
 * @param {Element} $el
 * @param {Object} props
 * @param {[[Number]]} props.lottoNumbers
 * @constructor
 */
export function LottoNumbers($el, props) {

    /**
     * @type {Object}
     * @property {Boolean} showNumbersView
     */
    let state = {
        showDetailNumbers: false,
    };

    const setState = (nextState) => {
        state = {
            ...state,
            ...nextState,
        };
        render();
    };

    const bindEvents = () => {
        $el.addEventListener('change', ({target}) => {
            if (target.dataset.action === 'toggleNumbersView') {
                toggleNumbersView();
            }
        });
    };

    const toggleNumbersView = () => {
        setState({
            showDetailNumbers: !state.showDetailNumbers,
        });
    };

    const render = () => {
        const {lottoNumbers} = props;
        const {showDetailNumbers} = state;

        const lottoCount = lottoNumbers.length;
        const ticketsView = lottoNumbers.map(lottoNumber => {
            return `
                <li class="mx-1 text-4xl lotto-wrapper" data-test="lotto-item-wrapper">
                    <span class="lotto-icon">🎟️ </span>
                    <span class="lotto-detail" style="display: ${showDetailNumbers ? 'inline' : 'none'}" data-test="lotto-item-number">${lottoNumber.join(', ')}</span>
                </li>
            `;
        });

        $el.innerHTML = `
            <div class="mt-9">
                <div class="d-flex">
                    <label class="flex-auto my-0" data-test="lotto-count-message">총 ${lottoCount}개를 구매하였습니다.</label>
                    <div class="flex-auto d-flex justify-end pr-1">
                        <label class="switch" data-test="toggle-number-switch">
                            <input type="checkbox" class="lotto-numbers-toggle-button" data-action="toggleNumbersView" ${showDetailNumbers ? 'checked' : ''} />
                            <span class="text-base font-normal">번호보기</span>
                        </label>
                    </div>
                </div>
                <ul class="d-flex flex-wrap ${showDetailNumbers ? 'flex-col' : ''}">
                    ${ticketsView.join('')}
                </ul>
            </div>
        `;

    };

    render();
    bindEvents();
}
