import Component from "../lib/Component.js";
import {$, $$} from "../modules/utils.js";

export default class ManualPurchaseModal extends Component {
  template() {
    const {isManualModalVisible} = this.props;
    return `
      <div class="modal${isManualModalVisible ? ' open' : ''}">
        <div class="modal-inner p-10">
          <div id="manualModalClose" class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>
          <h2>로또 수동구매</h2>
          <div class="d-flex justify-center">
            <section class="mt-9">
              <div class="d-flex">
                <div>
                  <h4 class="mt-0 mb-3 text-center">로또번호 6개를 입력해주세요.</h4>
                  <div>
                    ${
                      new Array(6).fill().reduce((str, ele, i) => {
                        str += `
                          <input
                            type="number"
                            class="winning-number input-number mx-1 text-center"
                          />
                        `;
                        return str;
                      }, '')
                    }
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-cyan mt-5 manual-purchase">구매</button>
            </section>
          </div>
        </div>
      </div>
    `
  }
  mounted() {
    const {purchaseManual, closeManualModal} = this.props;
    $('.modal .manual-purchase').addEventListener('click', () => purchaseManual([].map.call($$('.input-number'), ele => Number.parseInt(ele.value))));
    $('#manualModalClose').addEventListener('click', closeManualModal);
  }
}