import store from '../store/store.js';
import Component from '../core/Component.js';
import actionMap from '../actionMap.js';
import { LOTTO_WIN_MONEY } from '../utils/constants.js';
import { $ } from '../utils/dom.js';

class ShowResultSection extends Component {
  constructor(target) {
    super(target);
  }

  setMatchedLottoNumber() {
    const { purchasedLottoNumbers, winLottoNumber, bonusNumber } =
      store.getState();

    purchasedLottoNumbers.forEach((buyLottoNumber) => {
      const matchedNumber = winLottoNumber.filter((number) =>
        buyLottoNumber.includes(number)
      ).length;

      if (matchedNumber === 5 && buyLottoNumber.includes(bonusNumber)) {
        this.matchedLottoNumberAmount['bonus']++;
      } else this.matchedLottoNumberAmount[matchedNumber]++;
    });
  }

  setReturnRate() {
    const { price } = store.getState();
    let profit = 0;

    for (let i = 0; i < 8; i++) {
      const matchedNumber = this.matchedLottoNumberKey[i];
      profit +=
        this.matchedLottoNumberAmount[matchedNumber] * LOTTO_WIN_MONEY[i];
    }
    this.returnRate = profit / price;
  }

  setEvents() {
    $('#close_modal_btn').addEventListener('click', () => {
      $('.modal').classList.remove('open');
    });
    $('#restart_btn').addEventListener('click', () => {
      actionMap?.RESTART();
    });
  }

  template() {
    this.matchedLottoNumberKey = [0, 1, 2, 3, 4, 5, 'bonus', 6];
    this.matchedLottoNumberAmount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      bonus: 0,
      6: 0,
    };
    this.returnRate = 0;
    this.setMatchedLottoNumber();
    this.setReturnRate();

    return `
    <div class="modal">
        <div class="modal-inner p-10">
          <div id="close_modal_btn"class="modal-close" >
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆 </h2>
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
                  <td class="p-3">${this.matchedLottoNumberAmount[3]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${this.matchedLottoNumberAmount[4]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${this.matchedLottoNumberAmount[5]}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${this.matchedLottoNumberAmount['bonus']}개</td>
                </tr>'
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${this.matchedLottoNumberAmount[6]}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 ${this.returnRate}%입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" id="restart_btn"class="btn btn-cyan" >다시 시작하기</button>
          </div>
        </div>
      </div>
    `;
  }
}

export default ShowResultSection;
