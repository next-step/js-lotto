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

export const lottoListView = (isVisible, lottoList) => {
  const list = lottoList
    .map((lotto) => lottoDetailView(isVisible, lotto.join(", ")))
    .join("\n");
  return list;
};
