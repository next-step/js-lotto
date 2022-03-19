const LottoListTemplate = ({ numbers }) => {
  const buildTemplate = () => {
    if (numbers.length === 0) return '';
    return `
    <div class="d-flex">
      <label class="flex-auto my-0">총 <span data-props="count-span">${
        numbers.length
      }</span>개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" data-props="toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <ul class="d-flex flex-wrap lotto-list">
      ${numbers
        .map(
          lotto => `
      <li class="mx-1 text-4xl lotto-numbers-wrapper">
        <span>🎟️ </span>
        <span class="lotto-numbers d-none">${lotto.join(', ')}</span>
      </li>
      `,
        )
        .join('')}
    </ul>
    `;
  };

  const $section = document.createElement('section');
  $section.classList.add('mt-9');
  $section.setAttribute('data-props', 'lotto-wrapper-section');
  $section.innerHTML = buildTemplate();
  return $section;
};

export default LottoListTemplate;
