import {AmountForm} from './AmountForm.js';
import LottoService from '../services/LottoService.js';
import {PRICE_PER_TICKET} from '../consts.js';
import {Tickets} from './Tickets.js';
import {$} from '../utils/element.js';
import RenderService from '../services/RenderService.js';

export const LottoApp = ($el) => {

    /**
     * @type {{amount: number | null, tickets: Ticket[]}}
     */
    const state = {
        amount: null,
        tickets: [],
    };

    function purchaseTickets(amount) {
        state.amount = amount;
        state.tickets = LottoService.autoGenerateLottoNumbers(amount / PRICE_PER_TICKET);
        Tickets($('[data-component="tickets"]', $el), {tickets: state.tickets});
    };

    RenderService.render({
        $el,
        template: `
            <div class="d-flex justify-center mt-5">
                <div class="w-100">
                    <h1 class="text-center">🎱 행운의 로또</h1>
                    <div data-component="amount-form"></div>
                    <div data-component="tickets"></div>
                    <form class="mt-9" style="display: none;">
                        <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
                        <div class="d-flex">
                            <div>
                            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                            <div>
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                                <input
                                    type="number"
                                    class="winning-number mx-1 text-center"
                                />
                            </div>
                            </div>
                            <div class="bonus-number-container flex-grow">
                                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                                <div class="d-flex justify-center">
                                    <input type="number" class="bonus-number text-center" />
                                </div>
                            </div>
                        </div>
                        <button
                          type="button"
                          class="open-result-modal-button mt-5 btn btn-cyan w-100"
                        >
                            결과 확인하기
                        </button>
                    </form>
                </div>
            </div>
            <div class="modal">
                <div class="modal-inner p-10">
                    <div class="modal-close">
                        <svg viewbox="0 0 40 40">
                          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </div>
                    <h2 class="text-center">🏆 당첨 통계 🏆</h2>
                    <div class="d-flex justify-center">
                        <table class="result-table border-collapse border border-black">
                            <thead>
                                <tr class="text-center">
                                    <th class="p-3">일치 갯수</th>
                                    <th class="p-3">당첨금</th>
                                    <th class="p-3">당첨 갯수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center">
                                    <td class="p-3">3개</td>
                                    <td class="p-3">5,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">4개</td>
                                    <td class="p-3">50,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">5개</td>
                                    <td class="p-3">1,500,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">5개 + 보너스볼</td>
                                    <td class="p-3">30,000,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                                <tr class="text-center">
                                    <td class="p-3">6개</td>
                                    <td class="p-3">2,000,000,000</td>
                                    <td class="p-3">n개</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
                    <div class="d-flex justify-center mt-5">
                        <button type="button" class="btn btn-cyan">다시 시작하기</button>
                    </div>
                </div>
            </div> 
        `,
        childComponents: [
            {
                selector: '[data-component="amount-form"]',
                props: {purchaseTickets},
                renderComponent: AmountForm,
            }
        ],
    });
};
