export const lottoTemplate = (lotto) => {
    return `
        <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail" style="display: none;">${lotto.join('')}</span>
        </li>
    `;
};
