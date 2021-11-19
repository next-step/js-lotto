import Component from '../core/Component'
import ElementId from '../constants/ElementId'
import EventType from '../constants/EventType'
import { BASE_LOTTO_NUMBERS, BONUS_LOTTO_NUMBER } from '../constants/DomName'
import ClassName from '../constants/ClassName'
import CypressDom from '../constants/CypressDom'

export default class LottoContainer extends Component {
  template() {
    return `
            <h1 class="text-center">🎱 행운의 로또</h1>
            <form class="mt-5" onsubmit="document.querySelector('button[data-event=PURCHASE]').click(); return false;">
                <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                <div class="d-flex">
                    <input
                        id="${ElementId.purchaseInput}"
                        type="number"
                        class="w-100 mr-2 pl-2"
                        placeholder="구입 금액"
                        data-test-element="${CypressDom.purchaseInput}"
                    />
                    <button type="button" class="btn btn-cyan" data-event="${EventType.purchase}" data-test-element="${CypressDom.purchaseButton}">확인</button>
                </div>
            </form>
            <section class="mt-9 ${ClassName.displayNone}" id="${ElementId.purchasedLotto}">
                <div class="d-flex">
                <label class="flex-auto my-0" id="${ElementId.purchasedLottoAmountLabel}" data-test-element="${CypressDom.lottoCountLabel}"></label>
                <div class="flex-auto d-flex justify-end pr-1">
                    <label class="switch">
                    <input type="checkbox" class="lotto-numbers-toggle-button" data-event="${EventType.toggleMyLotto}" id="${ElementId.toggleButton}" data-test-element="${CypressDom.toggleButton}" />
                    <span class="text-base font-normal">번호보기</span>
                    </label>
                </div>
                </div>
                <div class="d-flex flex-wrap" id="${ElementId.purchasedLottoViewer}"></div>
            </section>
            <form class="mt-9 ${ClassName.displayNone}" id="${ElementId.lottoAnswerInput}">
            <label class="flex-auto d-inline-block mb-3"
                >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex" onsubmit="event.preventDefault(); document.querySelector('button[data-event=CHECK_MY_LOTTO_RESULT]').click(); return false;">
                <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                    <input
                    data-test-element="${CypressDom.baseLottoInput}"
                    name="${BASE_LOTTO_NUMBERS}"
                    type="number"
                    class="winning-number mx-1 text-center"/>
                </div>
                </div>
                <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                    <input type="number" class="bonus-number text-center" 
                    data-test-element="${CypressDom.bonusLottoInput}" name="${BONUS_LOTTO_NUMBER}"
                     />
                </div>
                </div>
            </div>
            <button
                type="button"
                class="open-result-modal-button mt-5 btn btn-cyan w-100"
                data-event="${EventType.checkMyLottoResult}"
                data-test-element="${CypressDom.benefitRateButton}"
            >
                결과 확인하기!
            </button>
            </form>
        `
  }
}
