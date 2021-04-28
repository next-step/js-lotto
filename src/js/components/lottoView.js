import {
  $,
  $all,
  $addClass,
  VIEW_SELECTOR,
  $attr,
  $removeClass,
} from "../utils/dom.js";

export default function LottoView(app) {
  const $view = $(VIEW_SELECTOR.SECTION);
  let onView = VIEW_CHANGE.ON();

  this.render = (lottos) => {
    const $lottos = $(VIEW_SELECTOR.LOTTOS, $view);
    const templates = lottos.map((lotto) => LottoTemplate(lotto));
    $lottos.innerHTML = templates.join("\n");
    const $total = $(VIEW_SELECTOR.TOTAL, $view);
    $total.textContent = lottos.length;
  };

  const onOffLottoNumber = () => {
    onView = VIEW_CHANGE[onView]();
    const $lottos = $(VIEW_SELECTOR.LOTTOS, $view);
    VIEW_SET_CLASS[onView]($lottos);
    const $lottoAll = $all(VIEW_SELECTOR.LOTTO_DETAIL, $view);
    $lottoAll.forEach(($lotto) => {
      $attr($lotto, ...VIEW_ATTR[onView]);
    });
  };

  $(VIEW_SELECTOR.SWITCH, $view).addEventListener("click", onOffLottoNumber);
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

const VIEW_SET_CLASS = {
  ON: (target) => $addClass(target, VIEW_LOTTO_ATTR),
  OFF: (target) => $removeClass(target, VIEW_LOTTO_ATTR),
};

const VIEW_ATTR = {
  ON: ["style", "display: inline;"],
  OFF: ["style", "display: none;"],
};

const VIEW_CHANGE = {
  ON: () => "OFF",
  OFF: () => "ON",
};

const VIEW_LOTTO_ATTR = "flex-col";
