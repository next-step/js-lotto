const lottoItems = (lotto) => {
	return lotto.map((eachItem) => {
		return `<li class="mx-1 text-4xl d-flex items-center">
      <span>🎟️ </span>
      <span id="lotto-detail" class="text-xl ml-2 d-none">${eachItem}</span>
    </li>`;
	});
};

const renderLottoList = (dom, lotto) => {
	dom.innerHTML = lottoItems(lotto).join('');
};

// TODO: STEP 2
const renderLottoResult = () => {};

export { renderLottoList, renderLottoResult };
