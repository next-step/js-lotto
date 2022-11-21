import { SELECTOR } from "../utils/constants.js";
import { $, $all } from "../utils/dom.js";

const showLottoNums = (element) => {
    element.classList.add('d-block');
    element.classList.remove('d-flex');
    $all(SELECTOR.LOTTO_NUMS, element).forEach(lotto => { lotto.style.display = 'inline-block' })
};

const hideLottoNums = (element) => {
    element.classList.add('d-flex');
    element.classList.remove('d-block');
    $all(SELECTOR.LOTTO_NUMS, element).forEach((lotto) => {
        lotto.style.display = 'none';
    });
};

export default (targetElement, { toggleOn }) => {
    const newLottoImages = targetElement.cloneNode(true);
    if (toggleOn) {
        showLottoNums(newLottoImages);
    } else {
        hideLottoNums(newLottoImages);
    }
    return newLottoImages;
}