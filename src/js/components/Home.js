import { createElement } from "../core/DOM.js";

export function Home() {
  return createElement('div', { children: createElement('div', { children: document.createTextNode('자식의 자식') }) });
}
