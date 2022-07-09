const lottoItems = (lotto) => {
	return lotto.map((eachItem) => {
		return `
    <span class="mx-1 text-4xl">🎟️ ${eachItem}</span>
  `;
	});
};

const renderLottoList = (dom, lotto) => {
	dom.classList.remove('d-none');
	dom.classList.add('d-block');

	let template = `
    <section class="lotto-list mt-9 ">
      <div class="d-flex">
        <label class="flex-auto my-0">총 {{__total_count__}}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" class="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div class="lotto-items d-flex flex-wrap">
      {{__lotto_list__}}
      </div>
    </section>
    <form class="mt-9">
      <label class="flex-auto d-inline-block mb-3"
        >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
      >
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
      >
        결과 확인하기
      </button>
    </form>
  `;

	template = template.replace('{{__total_count__}}', lotto.length);
	template = template.replace('{{__lotto_list__}}', lottoItems(lotto).join(''));

	const div = document.createElement('div');
	div.innerHTML = template;

	dom.appendChild(div);
};

const toggleLottoListSwitch = (dom) => {};

const renderLottoResult = () => {};

export { renderLottoList, toggleLottoListSwitch, renderLottoResult };
