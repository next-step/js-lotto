/**
 * @param selector
 * @param $parent
 * @return {*}
 */
export const $ = (selector, $parent = document) => {
    return $parent.querySelector(selector);
};

export const replaceRender = ({$originEl, replaceHTML, bindEvents = []}) => {

    const $newEl = $originEl.cloneNode(false);
    $newEl.insertAdjacentHTML('beforeend', replaceHTML);

    bindEvents.forEach(func => func($newEl));

    $originEl.replaceWith($newEl);

    return $newEl;
};
