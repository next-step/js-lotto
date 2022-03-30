export const replaceRender = ({$originEl, replaceHTML, bindEvents = []}) => {

    const $newEl = $originEl.cloneNode(false);
    $newEl.insertAdjacentHTML('beforeEnd', replaceHTML);

    bindEvents.forEach(func => func($newEl));

    $originEl.replaceWith($newEl);

    return $newEl;
}