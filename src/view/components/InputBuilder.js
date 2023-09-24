import { createElement, createFragment } from '../DOMHandler.js';
import { addEvent } from '../eventHandler.js';

class InputBuilder {
  #input = null;
  #id = '';
  #name = '';
  #placeholder = '';
  #type = 'text';

  constructor(id, name, placeholder, type) {
    this.#id = id;
    this.#name = name;
    this.#placeholder = placeholder;
    this.#type = type;
  }

  get $input() {
    return this.#input;
  }

  #setInput($input) {
    this.#input = $input;
  }

  #setInputAttributes($input) {
    if (this.#id) {
      $input.setAttribute('id', this.#id);
    }

    if (this.#name) {
      $input.setAttribute('name', this.#name);
    }

    if (this.#placeholder) {
      $input.setAttribute('placeholder', this.#placeholder);
    }

    $input.setAttribute('type', this.#type);
  }

  #createLabel(labelText = 'label') {
    const $label = createElement('label');
    $label.setAttribute('for', this.#id);
    if (labelText) {
      $label.textContent = labelText;
    }
    return $label;
  }

  createInputWithContainer({ withLabel = true, labelText, $container }) {
    const $fragment = createFragment();
    const $input = createElement('input');
    this.#setInput($input);
    this.#setInputAttributes($input);
    $container.appendChild($input);

    if (withLabel) {
      const $label = this.#createLabel(labelText);
      $fragment.appendChild($label);
    }
    $fragment.appendChild($container);
    return $fragment;
  }

  createInput(withLabel = true, $container = null) {
    const $input = createElement('input');
    this.#setInput($input);
    this.#setInputAttributes($input);

    if ($container) {
      $container.appendChild($input);
    }

    if (withLabel) {
      const $label = this.#createLabel($container);
      $label.setAttribute('for', this.#id);

      if ($container) {
        $container.prepend($label);
        return $container;
      }
      $input.before($label);
      return $input;
    }

    return $input;
  }

  addEventListener(eventType, callback) {
    addEvent(this.#input, eventType, callback);
  }
}

export default InputBuilder;
