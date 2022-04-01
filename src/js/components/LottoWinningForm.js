import Component from '../core/Component.js';

class LottoWinningForm extends Component {
  template() {
    return `
      <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div id="winning-input">
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" maxNumber="45" min="1" />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" name="winning-number" max="45" min="1" />
          </div>
        </div>
      </div>
      <button type="submit" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>
    `;
  }

  setEvent() {
    const { result, changeInput } = this.$props;

    this.addEvent('submit', '#form-winning', result);
    this.addEvent('input', '#winning-input', changeInput);
  }
}

export default LottoWinningForm;
