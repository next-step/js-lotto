/**
 * @param {number} count
 */
function templateLottoListContainer(count) {
  return `
    <div class="d-flex">
      <label class="flex-auto my-0">
        총 <span class="lotto-list-count">${count}</span>개를 구매하였습니다.
      </label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-list-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap lotto-list"></div>
  `;
}

/**
 * @param {number[]} data
 */
function templateLottoList(data) {
  return data.map(() => `<span class="mx-1 text-4xl lotto-item">🎟️</span>`).join('');
}

/**
 * @param {number[]} data
 */
function templateLottoListWithNumber(data) {
  return data
    .map(
      (data) =>
        `<span class="d-flex items-center w-100 mx-1 text-4xl lotto-item">
          🎟️
          <span class="text-base lotto-number">${data}</span>
        </span>`,
    )
    .join('');
}

export { templateLottoListContainer, templateLottoList, templateLottoListWithNumber };
