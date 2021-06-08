function LottoBoard({ target, onChange }) {
	this.setState = (showLotto) => {
		this.render(showLotto);
	};

	this.setLottos = (lottos) => {
		this.lottos = lottos;
	};

	const renderLottoNumber = (showLotto) => {
		const lottoStr = this.lottos.map((lotto) => {
			if (!showLotto) {
				return `<span class="mx-1 text-4xl">🎟️</span>`;
			}

			let str = "";
			for (const num of lotto) {
				str += `${num} `;
			}
			return `<span class="mx-1 text-4xl">🎟️ ${str}</span>`;
		});

		return lottoStr.join("");
	};

	this.render = (showLotto) => {
		target.innerHTML = "";
		if (showLotto) {
			target.innerHTML = `<div class="d-flex">
      <label class="flex-auto my-0">총 ${this.lottos.length}개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-numbers-toggle-button"  checked/>
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap">
    ${renderLottoNumber(showLotto)}
    </div>`;
		} else {
			target.innerHTML = `<div class="d-flex">
        <label class="flex-auto my-0">총 ${this.lottos.length}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap">
      ${renderLottoNumber(showLotto)}
      </div>`;
		}

		document.querySelector(".lotto-numbers-toggle-button").addEventListener("change", onChange);
	};
}

export default LottoBoard;
