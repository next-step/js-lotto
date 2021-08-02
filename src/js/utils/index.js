export function $(selector, base = document) {
  return base.querySelector(selector)
}

export function $$(selector, base = document) {
  return base.querySelectorAll(selector)
}
