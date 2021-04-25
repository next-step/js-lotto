function UserLottoInput({ target, setUserLotto, toggleModal, calculateResult, setBonusNumber }) {
	const onClick = () => {
		const inputs = document.querySelectorAll(".user-lotto-number");
		const values = [...inputs].map((input) => {
			if (input.classList.contains("bonus-number")) {
				setBonusNumber(input.value);
			}
			return parseInt(input.value);
		});

		const lottoSet = new Set([...values]);

		if (lottoSet.size !== 7) {
			alert("숫자를 다 입력해주세요");
		}

		setUserLotto(lottoSet);
		calculateResult();
		toggleModal();
	};

	this.render = () => {
		target.innerHTML = "";
		target.innerHTML = ` <label class="flex-auto d-inline-block mb-3"
        >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
      >
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center user-lotto-number"
            />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center user-lotto-number" />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="open-result-modal-button mt-5 btn btn-cyan w-100 lotto-result"
      >
        결과 확인하기
      </button>`;

		document.querySelector(".lotto-result").addEventListener("click", onClick);
	};
}

export default UserLottoInput;
