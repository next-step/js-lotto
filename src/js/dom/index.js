export const replaceChild = ($el, $clonedEl) => {
  $el.parentNode.replaceChild($clonedEl, $el);
  return $clonedEl;
};

export const $Curry = ($container) => (selector) => $(selector, $container);

export const $ = (selector, $container = document) =>
  $container.querySelector(selector);

export const rendererCurry =
  (App, ...components) =>
  (state) => {
    components.forEach(([$el, component]) => {
      component?.render?.($el, state);
    });
    App();
  };

export const eventBinderCurry =
  ($clonedApp) =>
  (...components) =>
    components.forEach(([$el, component]) =>
      component?.bindEvents?.($el, $clonedApp)
    );

export const onCurry =
  ($app) =>
  (...events) =>
    on(...events, $app);

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

export const toggleClassName = ($el, type, className) => {
  $el.classList[type](className);
};
