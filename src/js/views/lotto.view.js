export class LottoView {
    constructor() {
    }

    renderToReplaceInnerHTML($element, value = null) {
        $element.innerHTML = value;
    }

    renderToAddInnerHTML($element, value = null) {
        $element.innerHTML += value;
    }

    renderInputValue($input, value = null) {
        $input.value = value;
    }

    displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');
    displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');
    displayInline = ($elements) => $elements.forEach($el => $el.style.display = 'inline');
    displayFlex = ($elements) => $elements.forEach($el => $el.style.display = 'flex');


    removeChildNodes($element) {
        while ($element.hasChildNodes()) {
            $element.removeChild($element.firstChild);
        }
    }

    renderCheckedButton = ($element, isChecked) => $element.checked = isChecked;
}