import { DOM } from '../constants.js';
import Component from '../core/Component.js';

class PurchaseSection extends Component {
  template() {
    return `
			<div class="d-flex">
				<label id="${DOM.purchaseSectionLabel}" class="mb-2 d-inline-block">총 5개를 구매하였습니다.</label>
				<div class="flex-auto d-flex justify-end pr-1">
					<label class="switch">
						<input type="checkbox" id="${DOM.purchaseSectionLottoNumbersToggleButton}" class="lotto-numbers-toggle-button" />
						<span class="text-base font-normal">번호보기</span>
					</label>
				</div>
			</div>
			<div id="${DOM.purchaseSectionLottoNumbersFlexBox}" class="d-flex flex-wrap">
				<span class="mx-1 text-4xl">🎟️ </span>
				<span class="mx-1 text-4xl">🎟️ </span>
				<span class="mx-1 text-4xl">🎟️ </span>
				<span class="mx-1 text-4xl">🎟️ </span>
				<span class="mx-1 text-4xl">🎟️ </span>
			</div>
		`;
  }
}

export default PurchaseSection;
