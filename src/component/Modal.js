function Modal({ target, toggleModal, onRestart }) {
	this.setState = (modalOpen, result, profitRatio) => {
		this.render(modalOpen, result, profitRatio);
	};

	this.render = (modalOpen, result, profitRatio) => {
		if (modalOpen) {
			target.classList.add("open");
		} else {
			target.classList.remove("open");
		}

		target.innerHTML = `<div class="modal-inner p-10">
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
                <td class="p-3">${result.get(3) || 0}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">50,000</td>
                <td class="p-3">${result.get(4) || 0}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">1,500,000</td>
                <td class="p-3">${result.get(5) || 0}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">30,000,000</td>
                <td class="p-3">${result.get("5b") || 0}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">2,000,000,000</td>
                <td class="p-3">${result.get(6) || 0}개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-center font-bold">당신의 총 수익률은 ${profitRatio}%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button type="button" class="btn btn-cyan restart-button">다시 시작하기</button>
        </div>`;

		document.querySelector(".modal-close").addEventListener("click", toggleModal);
		document.querySelector(".restart-button").addEventListener("click", onRestart);
	};
}

export default Modal;
