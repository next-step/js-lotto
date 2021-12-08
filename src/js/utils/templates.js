export const countLottoTemplate = (countLotto) =>
	`총 ${countLotto}개를 구매하였습니다.`;

export const fullLottoTemplate = (array, isChecked) =>
	array
		.map(
			(subArray) => /*html*/ `
        <span class="mx-1 text-4xl">
          <span class="lotto-icon">🎟️</span>
          <span class="lotto-numbers ${
						isChecked ? '' : 'hidden'
					}">${subArray
				.map((val) =>
					String(val).length === 2 ? String(val) : "&nbsp" + String(val)
				)
				.join(", ")}</span> 
        </span>
`
		)
		.join("");

export const resultLottoTemplate = (array) => {
	const subTemplate = array
		.map(
			({ matchText, prize, count }) => /*html*/ `
			<tr class="text-center">
				<td class="p-3">${matchText}</td>
				<td class="p-3">${prize.toLocaleString()}</td>
				<td class="p-3">${count}개</td>
			</tr>
`
		)
		.join("");

	return `
		<thead>
			<tr class="text-center">
				<th class="p-3">일치 갯수</th>
				<th class="p-3">당첨금</th>
				<th class="p-3">당첨 갯수</th>
			</tr>
		</thead>
		<tbody>
			${subTemplate}
		</tbody>
	`;
};

export const profitRateTemplate = (num) => {
	return `당신의 총 수익률은 ${num}%입니다.`
}
