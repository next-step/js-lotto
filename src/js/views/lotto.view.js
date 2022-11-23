export class LottoView {
    constructor() {
    }

    renderToReplaceInnerHTML($element, value) {
        $element.innerHTML = value;
    }

    renderToAddInnerHTML($element, value) {
        $element.innerHTML += value;
    }

    displayNone = ($elements) => $elements.forEach($el => $el.style.display = 'none');
    displayBlock = ($elements) => $elements.forEach($el => $el.style.display = 'block');
    displayInline = ($elements) => $elements.forEach($el => $el.style.display = 'inline');

    removeChildNodes($element) {
        while ($element.hasChildNodes()) {
            $element.removeChild($element.firstChild);
        }
    }

    renderCheckedButton = ($element, isChecked) => $element.checked = isChecked;
}