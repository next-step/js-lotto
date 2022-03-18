import { DOM } from '../constants.js';
import Component from '../core/Component.js';
import { $, $$ } from '../utils/dom.js';

class PurchaseSection extends Component {
  template() {
    return String.raw`
      <div class="d-flex">
        <label id="${DOM.purchaseSectionLabel}" class="mb-2 d-inline-block"
          >총 ${this.props.lottoCount}개를 구매하였습니다.</label
        >
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input
              type="checkbox"
              id="${DOM.purchaseSectionLottoNumbersToggleButton}"
              class="lotto-numbers-toggle-button"
            />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="${DOM.purchaseSectionLottoNumbersFlexBox}" class="d-flex flex-wrap">
        ${this.createLottoWithLottoNumbers(this.props.allLottoNumbers)}
      </div>
    `;
  }

  setEvent() {
    $(`#${DOM.purchaseSectionLottoNumbersToggleButton}`).addEventListener('click', () => {
      $(`#${DOM.purchaseSectionLottoNumbersFlexBox}`).classList.toggle('flex-col');
      const lottoDetails = $$(`.${DOM.lottoDetail}`);
      for (let i = 0; i < lottoDetails.length; i += 1) {
        lottoDetails[i].style.display =
          lottoDetails[i].style.display === 'none' ? 'inline' : 'none';
      }
    });
  }

  createLottoWithLottoNumbers(allLottoNumbers) {
    return allLottoNumbers
      .map(
        oneLottoNumbers => String.raw`
          <div class="mx-1 text-4xl">
            <span class=${DOM.lottoIcon}>🎟️ </span>
            <span class="${DOM.lottoDetail} text-2xl" style="display: none">
              ${oneLottoNumbers.join(', ')}
            </span>
          </div>
        `,
      )
      .join('');
  }
}

export default PurchaseSection;
