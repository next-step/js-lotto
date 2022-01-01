import Component from "../lib/Component.js";
import {$} from "../modules/utils.js";

export default class Modal extends Component {
  template() {
    const {isModalVisible, winnings} = this.props;
    return `
      <div class="modal${isModalVisible ? ' open' : ''}">
        <div class="modal-inner p-10">
          <div id="modalClose" class="modal-close">
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
                  <td class="p-3">${winnings.rankings.find(ranking => ranking.grade === 5).tickets.length}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${winnings.rankings.find(ranking => ranking.grade === 4).tickets.length}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${winnings.rankings.find(ranking => ranking.grade === 3).tickets.length}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${winnings.rankings.find(ranking => ranking.grade === 2).tickets.length}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${winnings.rankings.find(ranking => ranking.grade === 1).tickets.length}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 ${winnings.profitRate}%입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan reset">다시 시작하기</button>
          </div>
        </div>
      </div>
    `
  }
  mounted() {
    const {reset, closeModal} = this.props;
    $('.reset').addEventListener('click', reset);
    $('#modalClose').addEventListener('click', closeModal);
  }
}