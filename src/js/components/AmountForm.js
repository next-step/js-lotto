/**
 * @param {Element} $el
 * @param {Object} props
 * @param {Number} props.amount
 * @param {Function} props.setAmount
 * @constructor
 */
export function AmountForm($el, props) {

    const bindEvents = () => {
        $el.addEventListener('submit', event => {
            event.preventDefault();
            enterAmount(Number(new FormData(event.target).get('amount')));
        });
    };

    const enterAmount = (amount) => {
        if (amount % 1000 !== 0) {
            alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
            return;
        }

        props.setAmount(amount);
    };

    const render = () => {
        $el.innerHTML = `
            <form class="mt-5">
                <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                <div class="d-flex">
                    <input type="number" class="w-100 mr-2 pl-2" name="amount" placeholder="구입 금액" min="1000" ${props.amount ? `value="${props.amount}"` : ''} data-test="amount-input"/>
                    <button type="submit" class="btn btn-cyan" data-test="amount-submit-button">확인</button>
                </div>
            </form>
        `;
    };

    render();
    bindEvents();
}
