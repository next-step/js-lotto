const renderNumberToDOM = (dom, number) => {
	dom.innerHTML = number;
};

const lottoItems = (lotto) => {
	return lotto.map((eachItem) => {
		return `<li class="mx-1 text-4xl d-flex items-center">
      <span
				data-cy="lotto-ticket"
			>
				🎟️ 
			</span>
      <span
				data-cy="lotto-detail"
				id="lotto-detail"
				class="text-xl ml-2 d-none"
			>
				${eachItem}
			</span>
    </li>`;
	});
};

const renderLottoList = (dom, lotto) => {
	dom.innerHTML = lottoItems(lotto).join('');
};

const renderLottoResultTable = (dom, resultTable) => {
	let tableTemplate = `
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
				<td class="p-3" id="winning-5" data-cy="winning-5">{{__fifth_rank__}}개</td>
			</tr>
			<tr class="text-center">
				<td class="p-3">4개</td>
				<td class="p-3">50,000</td>
				<td class="p-3" id="winning-5" data-cy="winning-5">{{__forth_rank__}}개</td>
			</tr>
			<tr class="text-center">
				<td class="p-3">5개</td>
				<td class="p-3">1,500,000</td>
				<td class="p-3" id="winning-5" data-cy="winning-5">{{__third_rank__}}개</td>
			</tr>
			<tr class="text-center">
				<td class="p-3">5개 + 보너스볼</td>
				<td class="p-3">30,000,000</td>
				<td class="p-3" id="winning-5" data-cy="winning-5">{{__second_rank__}}개</td>
			</tr>
			<tr class="text-center">
				<td class="p-3">6개</td>
				<td class="p-3">2,000,000,000</td>
				<td class="p-3" id="winning-5" data-cy="winning-5">{{__first_rank__}}개</td>
			</tr>
		</tbody>
	`;

	tableTemplate = tableTemplate.replace(`{{__fifth_rank__}}`, resultTable[5] ?? 0);
	tableTemplate = tableTemplate.replace(`{{__forth_rank__}}`, resultTable[4] ?? 0);
	tableTemplate = tableTemplate.replace(`{{__third_rank__}}`, resultTable[3] ?? 0);
	tableTemplate = tableTemplate.replace(`{{__second_rank__}}`, resultTable[2] ?? 0);
	tableTemplate = tableTemplate.replace(`{{__first_rank__}}`, resultTable[1] ?? 0);
	dom.innerHTML = tableTemplate;
};

export { renderLottoList, renderLottoResultTable, renderNumberToDOM };
