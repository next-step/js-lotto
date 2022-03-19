export const $ = (selector, $container = document) =>
  $container.querySelector(selector);

export const $Curry = ($container) => (selector) => $(selector, $container);

export const renderer =
  ($clonedApp) =>
  (...components) =>
    components.forEach(([$el, handler]) => handler($el, $clonedApp));

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
