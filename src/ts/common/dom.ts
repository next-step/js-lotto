export function $(query: string) {
  return document.querySelector(query);
}

export function $$(query: string) {
  return document.querySelectorAll(query);
}

export function id2Query(id: string) {
  return `#${id}`;
}

export function class2Query(className: string) {
  return `.${className}`;
}
