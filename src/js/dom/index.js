export const $ = (selector, $container = document) =>
  $container.querySelector(selector);

export const $Curry =
  (parent, $container = document) =>
  (selector) =>
    $(selector, $(parent, $container));

const removeChildren = ($selector) => {
  while ($selector.hasChildNodes()) {
    $selector.firstChild.remove();
  }
};

export const renderTest = ($el, template) => {
  if (!$el) return;
  removeChildren($el);
  $el.insertAdjacentHTML('afterBegin', template);
};

export const render = (state, ...templates) => {
  templates.forEach(([$el, templateCreator]) => {
    if (!$el) return;
    removeChildren($el);

    const { template, bindEvents } = templateCreator($el, state);
    $el.insertAdjacentHTML('afterBegin', template);
    bindEvents?.();
  });
};

export const on = (event, handler, $container = document) => {
  $container.addEventListener(event, handler);
  return $container;
};

export const emit = (event, data, $container = document) => {
  $container.dispatchEvent(
    new CustomEvent(event, {
      detail: data,
      bubbles: false,
    })
  );

  return $container;
};
