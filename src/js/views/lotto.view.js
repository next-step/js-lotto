export class LottoView {
    constructor() {
    }

    renderToReplaceInnerHTML($element, value = null) {
        $element.innerHTML = value;
    }

    renderToAddInnerHTML($element, value = null) {
        $element.innerHTML += value;
    }

    renderToAppend($element, value) {
        $element.append(value);
    }

    renderInputValue($input, value = null) {
        $input.value = value;
    }

    renderToUpdateSelector(params) {
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

    renderCheckedButton = ($element, isChecked) => $element.checked = isChecked;

    renderToSetFocus = ($element) => $element.focus();
}