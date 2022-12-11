export class LottoView {
    constructor() {
    }

    replaceInnerHTML($element, value = null) {
        $element.innerHTML = value;
    }

    addInnerHTML($element, value = null) {
        $element.innerHTML += value;
    }

    appendElement($element, value) {
        $element.append(value);
    }

    setInputValue($input, value = null) {
        $input.value = value;
    }

    updateSelector(params) {
        params.selector = params.isAll ? document.querySelectorAll(params.className) : document.querySelector(params.className);
        return params.selector;
    }

    displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');
    displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');
    displayInline = ($elements) => $elements.forEach($el => $el.style.display = 'inline');
    displayFlex = ($elements) => $elements.forEach($el => $el.style.display = 'flex');

    remove($element) {
        $element.remove();
    }

    removeChildNodes($element) {
        while ($element.hasChildNodes()) {
            $element.removeChild($element.firstChild);
        }
    }

    checkButton = ($button, isChecked) => $button.checked = isChecked;
    disableButton = ($buttons, isDisabled) => $buttons.forEach($button => $button.disabled = isDisabled);

    setFocus = $element => $element.focus();
}