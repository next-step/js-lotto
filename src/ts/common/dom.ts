export function $(query: string, target?: HTMLElement): HTMLElement {
  return (target ?? document).querySelector(query) as HTMLElement;
}

export function $$(query: string, target?: HTMLElement): HTMLElement[] {
  return Array.from(
    (target ?? document).querySelectorAll<HTMLElement>(query),
    ($el) => $el
  );
}

export function id2Query(id: string) {
  return `#${id}`;
}

export function class2Query(className: string) {
  return `.${className}`;
}
