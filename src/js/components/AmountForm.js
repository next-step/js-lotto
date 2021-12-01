import {MIN_PURCHASE_AMOUNT, PRICE_PER_TICKET} from '../consts.js';
import ModalService from '../services/ModalService.js';
import RenderService from '../services/RenderService.js';

/**
 * @param $el
 * @param props
 * @param {function} props.typeAmount
 */
export const AmountForm = ($el, props) => {

    function onSubmitAmount(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const amount = Number(formData.get('amount'));
        if (!amount || amount % PRICE_PER_TICKET > 0) {
            ModalService.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
            return;
        }

        props.typeAmount(amount);
    }

    RenderService.render({
        $el,
        template: `
            <form class="mt-5" data-test="amount-form">
                <label class="mb-2 d-inline-block">
                    구입할 금액을 입력해주세요.
                </label>
                <div class="d-flex">
                    <input
                        type="number"
                        class="w-100 mr-2 pl-2"
                        placeholder="구입 금액"
                        name="amount"
                        min="${MIN_PURCHASE_AMOUNT}"
                        data-test="amount-input"
                    />
                    <button type="submit" class="btn btn-cyan">확인</button>
                </div>
            </form>
        `,
        eventListenerModels: [
            {
                selector: 'form',
                eventType: 'submit',
                callback: onSubmitAmount,
            },
        ],
    });
};
