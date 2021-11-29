/**
 * @param selector
 * @param $parent
 * @return {*}
 */
export const $ = (selector, $parent = document) => {
    return $parent.querySelector(selector);
};

export const $$ = (selector, $parent = document) => {
    return $parent.querySelectorAll(selector);
};

