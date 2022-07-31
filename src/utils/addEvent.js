export const addEvent = (type, selector, handler) => {
  const $el = document.querySelectorAll(selector)
  Array.from($el).forEach((element) => element.addEventListener(type, handler))
}
