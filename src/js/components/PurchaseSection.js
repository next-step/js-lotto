import { DOM } from '../constants.js';
import Component from '../core/Component.js';
import { $, $$ } from '../utils/dom.js';

class PurchaseSection extends Component {
  template() {
    return String.raw`
      <div class="d-flex">
        <label id="${DOM.PURCHASE_SECTION_LABEL}" class="mb-2 d-inline-block"
          >총 ${this.props.lottoCount}개를 구매하였습니다.</label
        >
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input
              type="checkbox"
              id="${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON}"
              class="lotto-numbers-toggle-button"
              onclick="${this.onClickLottoNumberToggleButton}"
            />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}" class="d-flex flex-wrap">
        ${this.createLottoWithLottoNumbers(this.props.allLottoNumbers)}
      </div>
    `;
  }

  setEvent() {
    $(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON}`).onclick =
      this.onClickLottoNumberToggleButton;
  }

  onClickLottoNumberToggleButton() {
    $(`#${DOM.PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX}`).classList.toggle('flex-col');
    const lottoDetails = $$(`.${DOM.LOTTO_DETAIL}`);

    for (let i = 0; i < lottoDetails.length; i += 1) {
      lottoDetails[i].style.display = lottoDetails[i].style.display === 'none' ? 'inline' : 'none';
    }
  }

  createLottoWithLottoNumbers(allLottoNumbers) {
    return allLottoNumbers
      .map(
        oneLottoNumbers => String.raw`
          <div class="mx-1 text-4xl">
            <span class=${DOM.LOTTO_ICON}>🎟️ </span>
            <span class="${DOM.LOTTO_DETAIL} text-2xl" style="display: none">
              ${oneLottoNumbers.join(', ')}
            </span>
          </div>
        `,
      )
      .join('');
  }
}

export default PurchaseSection;
