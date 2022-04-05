export const replaceRender = ({$originEl, replaceHTML, executors = []}) => {

    const $newEl = $originEl.cloneNode(false);
    $newEl.insertAdjacentHTML('beforeEnd', replaceHTML);

    executors.forEach(func => func($newEl));

    $originEl.replaceWith($newEl);

    return $newEl;
}