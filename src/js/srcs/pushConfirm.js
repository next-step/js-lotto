import { PRICE_ALERT } from "../utils/alert.js";
import { $input, $lottoNumbersToggleButton, $sectionAndForm, $userLottoContainer } from "../utils/constant.js";
import { createLotto} from "./createLotto.js";
import { setLotto } from "./setLottoSection.js";

export const onConfirmPrice = () => {
    const inputPrice = ($input.value);
    const lottoCount = Math.floor(inputPrice / 1000);

    if(lottoCount === 0 || lottoCount > 100){
        return;
    }

    if(inputPrice % 1000 !== 0){
        $input.value = '';
        return alert(PRICE_ALERT);
    }

    $sectionAndForm.forEach(sectionAndForm => {
        sectionAndForm.style.display = "block"
    })

    const allLotto = createLotto(lottoCount);
    setLotto(allLotto);

    $lottoNumbersToggleButton.checked = false;
}

