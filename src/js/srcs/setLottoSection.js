import { $lottoCountText, $userLottoContainer } from "../utils/constant.js"
import { resetLotto } from "./reset.js";

export const setLotto = (lotto) => {
    resetLotto();
    lotto.forEach(item => {
        let lottoWrapper = document.createElement('div');
        lottoWrapper.className = 'user-lotto-wrapper';
     
        let lottoItem = document.createElement('span');
        lottoItem.className = 'user-lotto mx-1 text-4xl';
        lottoItem.textContent = "🎟️";

        let lottoNumber = document.createElement('span');
        lottoNumber.className = 'user-lotto-number mx-1 text-4xl';
        lottoNumber.textContent += item
        lottoNumber.style.display = 'none';

        $userLottoContainer.append(lottoWrapper);
        lottoWrapper.append(lottoItem, lottoNumber)
    })
    
    $lottoCountText.textContent = `총 ${lotto.length}개를 구매하였습니다.`;
}