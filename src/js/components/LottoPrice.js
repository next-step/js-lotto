import Component from '../core/Component.js';
import { $ } from '../utils/index.js';

class LottoPrice extends Component {
  template() {
    const { lottoList, isShowLottoList } = this.$props;
    return `
      <form class="mt-5" id="form-price">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2 pl-2" placeholder="구입 금액" name="price" />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </form>
      <section class="mt-9 ${lottoList.length ? 'visible' : 'hidden'}" id="lotto-list">
        <div class="d-flex">
          <label class="flex-auto my-0" data-lotto="count-label">총 ${lottoList.length}개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input
               type="checkbox"
               class="lotto-numbers-toggle-button" ${isShowLottoList ? 'checked' : ''}
               />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <ul class="d-flex flex-wrap p-0">
          ${lottoList
            .map(
              (lotto) => `
              <li class="lotto-list-item d-flex items-center">
                  <span class="mx-1 text-4xl">🎟️ </span>
                  <span class="lotto-detail text-xl mx-3 none">${lotto.join(', ')}</span>
              </li>
          `
            )
            .join('')}
        </ul>
      </section>
    `;
  }
  setEvent() {
    const { buyLotto } = this.$props;
    this.addEvent('submit', '#form-price', buyLotto);
    this.addEvent('click', '.lotto-numbers-toggle-button', this.toggleLottoNumbersView);
  }

  toggleLottoNumbersView() {
    const lottoDetails = document.querySelectorAll('#lotto-list li span.lotto-detail');

    lottoDetails.forEach(($lottoDetail) => $lottoDetail.classList.toggle('none'));
  }
}

export default LottoPrice;
