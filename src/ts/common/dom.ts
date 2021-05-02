export function $(query: string, target?: HTMLElement): HTMLElement {
  return (target ?? document).querySelector(query) as HTMLElement;
}

export function $$(query: string, target?: HTMLElement) {
  return (target ?? document).querySelectorAll<HTMLElement>(query);
}

export function id2Query(id: string) {
  return `#${id}`;
}

export function class2Query(className: string) {
  return `.${className}`;
}
