export const lottoIconTemplate = (lottoNumberList) => {
    const lottoNumbers = lottoNumberList.join(', ');
    return `<li class="mx-1 text-4xl lotto-wrapper">
                <span class="lotto-icon">🎟️ </span>
                <span class="lotto-detail" style="display: none;">${lottoNumbers}</span>
            </li>`;
};

export const switchTemplate = () => {
    return `<input id="lotto-switch" type="checkbox" class="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>`;
};
