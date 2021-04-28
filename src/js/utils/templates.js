export const lottoIconTemplate = (lottoNumberList) => {
    const lottoNumbers = lottoNumberList.join(', ');
    return `<li class="mx-1 text-4xl lotto-wrapper">
                <span class="lotto-icon">🎟️ </span>
                <span class="lotto-detail" style="display: none;">${lottoNumbers}</span>
            </li>`;
};
