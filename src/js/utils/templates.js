const lottoDetailView = (isVisible, lottoNumbers) => {
  return isVisible
    ? `
  <li class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail">${lottoNumbers}</span>
  </li>
  `
    : `
  <li class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail" style="display:none">${lottoNumbers}</span>
  </li>
  `;
};

export const resultTable = ({ title, price, number }) =>
  `<tr class="text-center">
<td class="p-3">${title}</td>
<td class="p-3">${price}</td>
<td class="p-3">${number}개</td>
</tr>`;

export const lottoListView = (isVisible, lottoList) => {
  const list = lottoList
    .map((lotto) => lottoDetailView(isVisible, lotto.join(", ")))
    .join("\n");
  return list;
};

export const lottoResultView = (result) => {
  const list = result.map((value) => resultTable(value)).join("\n");
  return list;
};
