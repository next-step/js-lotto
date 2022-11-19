import { lottos } from "../service/lotto.js";

export const totalPurchaseMessageTemplate = (totalLottoCount) => {
	return `
    <label class="flex-auto my-0" data-cy="totalPurchaseMessage">총 ${totalLottoCount}개가 발급되었습니다.</label>
    `;
};

export const lottosTemplate = () => {
	return lottos.reduce(
		(prev, curr) =>
			prev +
			`
    <div class="mx-1 text-4xl">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-numbers">${curr.join(", ")}</span>
    </div>
    `,
		""
	);
};
