import { $ } from "../utils/document.js";

export function renderLottoNumbers($lottoNumbers, state, tickets) {
    const { isShowNumbers } = state;
    const lottoNumbersWrapClassNames = [
        "d-flex",
        "flex-wrap",
        isShowNumbers && "flex-col",
    ];
    const lottoDetailClassNames = [
        "lotto-detail",
        isShowNumbers ? "d-inline" : "d-none",
    ];

    const lottoNumbers = tickets.getRandomNumbers(({ randomNumbers }) => {
        return `
            <li class="mx-1 text-4xl lotto-wrapper" data-test="lotto-number">
                <span class="lotto-icon">🎟️ </span>
                <span class="${lottoDetailClassNames.join(
                  " "
                )}" data-test="lotto-number-detail">${randomNumbers.join(
      ", "
    )}</span>
            </li>
        `;
    });

    const lottoNumbersWrap = document.createElement("div");
    lottoNumbersWrap.setAttribute(
        "data-component",
        $lottoNumbers.getAttribute("data-component")
    );
    lottoNumbersWrap.insertAdjacentHTML(
        "beforeend",
        `
            <ul id="lotto-icons" class="${lottoNumbersWrapClassNames.join(
              " "
            )}">
                ${lottoNumbers.join("")}
            </ul>
        `
    );

    $lottoNumbers.replaceWith(lottoNumbersWrap);
}

export default renderLottoNumbers;