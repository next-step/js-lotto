/**
 * @param selector
 * @param $parent
 * @return {*}
 */
export const $ = (selector, $parent = document) => {
    return $parent.querySelector(selector);
};

