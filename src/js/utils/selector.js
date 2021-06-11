/**
 * Dom Select
 * @param {string} selector
 * @param {Element | Document} parent
 * @returns {Element}
 */
export const $ = ({selector, parent = document}) => {
    return parent.querySelector(selector);
};
