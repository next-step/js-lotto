import Component from '../core/Component'
import ElementId from '../constants/ElementId'
import EventType from '../constants/EventType'

export default class LottoPurchaseInput extends Component {
  template() {
    return `
            <h1 class="text-center">🎱 행운의 로또</h1>
            <form class="mt-5">
                <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                <div class="d-flex">
                    <input
                        id="${ElementId.purchaseInput}"
                        type="number"
                        class="w-100 mr-2 pl-2"
                        placeholder="구입 금액"
                    />
                    <button type="button" class="btn btn-cyan" data-event="${EventType.purchase}">확인</button>
                </div>
            </form>
        `
  }
}
