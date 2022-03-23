export function renderLottoNumbers($el, state, tickets) {
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

    const lottoNumbers = tickets.map(({ normalNumbers }) => {
        return `
            <li class="mx-1 text-4xl lotto-wrapper">
                <span class="lotto-icon">🎟️ </span>
                <span class="${lottoDetailClassNames.join(
            " "
        )}">${normalNumbers.join(", ")}</span>
            </li>
        `;
    });

    $el.querySelector('[data-component="lotto-numbers"]').innerHTML = `
        <ul id="lotto-icons" class="${lottoNumbersWrapClassNames.join(" ")}">
            ${lottoNumbers.join("")}
        </ul>
    `;
}

export default renderLottoNumbers;
