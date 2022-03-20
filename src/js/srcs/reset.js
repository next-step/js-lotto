import { $userLottoContainer } from "../utils/constant.js";

export const resetLotto = () => {
    const userlottoWrapper = document.querySelectorAll('.user-lotto-wrapper');
    userlottoWrapper.forEach(lottoWrapper => {
        $userLottoContainer.removeChild(lottoWrapper);
    })
}