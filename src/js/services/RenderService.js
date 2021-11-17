/**
 * @typedef {object} EventListenerModel
 * @property {string=} selector
 * @property {string} eventType
 * @property {function} callback
 */

/**
 * @param {HTMLElement} $el
 * @param {string} template
 * @param {EventListenerModel[]} eventListenerModels
 */
const render = ({$el, template, eventListenerModels = []}) => {

    const $newEl = $el.cloneNode(false);
    $newEl.insertAdjacentHTML('beforeend', template);

    eventListenerModels.forEach(({selector, eventType, callback}) => {
        const eventBindingEl = selector ? $newEl.querySelector(selector) : $newEl;
        eventBindingEl.addEventListener(eventType, event => callback(event));
    });

    $el.replaceWith($newEl);

    return $newEl;
};

export default {
    render,
}
