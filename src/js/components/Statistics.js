export class Statistics {
  constructor(target, onModalClose, onClickRestart) {
    this.#target = target;
    this.#target.innerHTML = this.#template([], 0);
    this.#setEvents(onModalClose, onClickRestart);
  }

  #target;

  #template = (winningCounts, profit) => {
    return `
            
            <div class="modal-inner p-10">
            <div class="modal-close">
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
                    <td class="p-3">${winningCounts["3개"]}개</td>

                    </tr>
                    <tr class="text-center">
                    <td class="p-3">4개</td>
                    <td class="p-3">50,000</td>
                    <td class="p-3">${winningCounts["4개"]}개</td>

                    </tr>
                    <tr class="text-center">
                    <td class="p-3">5개</td>
                    <td class="p-3">1,500,000</td>
                    <td class="p-3">${winningCounts["5개"]}개</td>

                    </tr>
                    <tr class="text-center">
                    <td class="p-3">5개 + 보너스볼</td>
                    <td class="p-3">30,000,000</td>
                    <td class="p-3">${winningCounts["5개 + 보너스볼"]}개</td>

                    </tr>
                    <tr class="text-center">
                    <td class="p-3">6개</td>
                    <td class="p-3">2,000,000,000</td>
                    <td class="p-3">${winningCounts["6개"]}개</td>

                    </tr>
                </tbody>
                </table>
            </div>
            <p class="text-center font-bold">당신의 총 수익률은 ${profit}%입니다.</p>
            <div class="d-flex justify-center mt-5">
                <button id="restart-button" type="button" class="btn btn-cyan">다시 시작하기</button>

            </div>
            </div>
        `;
  };

  #setEvents = (onModalClose, onClickRestart) => {
    const modalClose = document.querySelector(".modal-close");
    modalClose.addEventListener("click", onModalClose);
    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", onClickRestart);
  };

  setState = (winningCounts, profit, onModalClose, onClickRestart) => {
    this.#target.innerHTML = this.#template(winningCounts, profit);
    this.#setEvents(onModalClose, onClickRestart);

  };
}
