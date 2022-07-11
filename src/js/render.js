const renderPurchaseCount = (dom, count) => {
	dom.innerHTML = count;
};

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

const renderLottoResult = () => {};

export { renderLottoList, renderLottoResult, renderPurchaseCount };
