export function $(query: string, target?: HTMLElement): HTMLElement {
  if (target) {
    return target.querySelector(query) as HTMLElement;
  }
  return document.querySelector(query) as HTMLElement;
}

export function $$(query: string, target?: HTMLElement) {
  if (target) {
    return target.querySelectorAll<HTMLElement>(query);
  }
  return document.querySelectorAll<HTMLElement>(query);
}

export function id2Query(id: string) {
  return `#${id}`;
}

export function class2Query(className: string) {
  return `.${className}`;
}
