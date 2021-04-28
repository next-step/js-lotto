import { $, VIEW_SELECTOR } from "../utils/dom.js";

export default function LottoView(app) {
  const $view = $(VIEW_SELECTOR.SECTION);

  this.render = (lottos) => {
    const $lottos = $(VIEW_SELECTOR.LOTTOS, $view);
    const templates = lottos.map((lotto) => LottoTemplate(lotto));
    $lottos.innerHTML = templates.join("\n");
    const $total = $(VIEW_SELECTOR.TOTAL, $view);
    $total.textContent = lottos.length;
  };
}

const LottoTemplate = (lotto) =>
  `
<li class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail" style="display: none;">${lotto
    .getLottoNumbers()
    .join(", ")}</span>
</li>
`;
