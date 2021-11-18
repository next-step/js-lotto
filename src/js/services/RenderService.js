import {$} from '../utils/element.js';

/**
 * @typedef {object} EventListenerModel
 * @property {string=} selector
 * @property {string} eventType
 * @property {function} callback
 */

/**
 * @typedef {object} ChildComponentModel
 * @property {string} selector
 * @property {object} props
 * @property {function} componentFn
 */

/**
 * @param {HTMLElement} $el
 * @param {string} template
 * @param {EventListenerModel[]} eventListenerModels
 * @param {ChildComponentModel[]} childComponentModels
 */
const render = ({$el, template, eventListenerModels = [], childComponentModels = []}) => {

    const $temp = document.createElement('template');
    $temp.insertAdjacentHTML('beforeend', template);

    childComponentModels.forEach(({selector, props = {}, componentFn}) => {
        componentFn($(selector, $temp), props);
    });

    $el.replaceChildren(...$temp.children);

    eventListenerModels.forEach(({selector, eventType, callback}) => {
        const eventBindingEl = selector ? $el.querySelector(selector) : $el;
        eventBindingEl.addEventListener(eventType, event => callback(event));
    });
};

export default {
    render,
}
