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

    const $temp = document.createElement('template');
    $temp.insertAdjacentHTML('beforeend', template);

    $el.replaceChildren(...$temp.children);

    eventListenerModels.forEach(({selector, eventType, callback}) => {
        const eventBindingEl = selector ? $el.querySelector(selector) : $el;
        eventBindingEl.addEventListener(eventType, event => callback(event));
    });
};

export default {
    render,
}
