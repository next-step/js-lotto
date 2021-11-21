import {$} from '../utils/element.js';

/**
 * @typedef {object} EventListenerModel
 * @property {string=} selector
 * @property {string} eventType
 * @property {function} callback
 */

/**
 * @typedef {object} ChildComponent
 * @property {string} selector
 * @property {object} props
 * @property {function} renderComponent
 */

/**
 * @param {HTMLElement} $el
 * @param {string} template
 * @param {EventListenerModel[]} eventListenerModels
 * @param {ChildComponent[]} childComponents
 */
const render = ({$el, template, eventListenerModels = [], childComponents = []}) => {

    const $temp = document.createElement('template');
    $temp.insertAdjacentHTML('beforeend', template);

    childComponents.forEach(({selector, props = {}, renderComponent}) => {
        renderComponent($(selector, $temp), props);
    });

    $el.replaceChildren(...$temp.children);

    eventListenerModels.forEach(({selector, eventType, callback}) => {
        const eventBindingEl = selector ? $el.querySelector(selector) : $el;
        eventBindingEl.addEventListener(eventType, callback);
    });
};

export default {
    render,
}
