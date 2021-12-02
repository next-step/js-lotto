export const countLottoTemplate = (countLotto) =>
	`총 ${countLotto}개를 구매하였습니다.`;

export const fullLottoTemplate = (array, isChecked) =>
	array
		.map(
			(subArray) => /*html*/`
        <span class="mx-1 text-4xl">
          <span class="lotto-icon">🎟️</span>
          <span class="lotto-numbers ${isChecked ? '' : 'hidden'}">${subArray
						.map((val) =>
							String(val).length === 2 ? String(val) : "&nbsp" + String(val)
						)
						.join(", ")}</span> 
        </span>
`
		)
		.join("");
