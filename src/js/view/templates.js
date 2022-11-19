import { lottos } from "../service/lotto.js";

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
