export const $ = (selector, $parent = document) => {
    return $parent.querySelector(selector);
};