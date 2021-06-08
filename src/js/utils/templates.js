'use strict';

export const template = {
  lotto: numbers => {
    return `
	<li class="mx-1 text-4xl lotto-wrapper">
		<span class="lotto-icon">🎟️ </span>
		<span class="lotto-detail" style="display: none">${numbers}</span>
  	</li>
	`;
  },

  result: result => {
    return `
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
					<td class="p-3">${result.fifth}개</td>
				</tr>
				<tr class="text-center">
					<td class="p-3">4개</td>
					<td class="p-3">50,000</td>
					<td class="p-3">${result.fourth}개</td>
				</tr>
				<tr class="text-center">
					<td class="p-3">5개</td>
					<td class="p-3">1,500,000</td>
					<td class="p-3">${result.third}개</td>
				</tr>
				<tr class="text-center">
					<td class="p-3">5개 + 보너스볼</td>
					<td class="p-3">30,000,000</td>
					<td class="p-3">${result.second}개</td>
				</tr>
				<tr class="text-center">
					<td class="p-3">6개</td>
					<td class="p-3">2,000,000,000</td>
					<td class="p-3">${result.first}개</td>
				</tr>
			</tbody>
		</table>
	  `;
  },
};
