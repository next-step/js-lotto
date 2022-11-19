import { createElement } from "../core/DOM.js";

export function LottoList(lottos) {
  if (!lottos || lottos.length <= 0) {
    return createElement('div', { children: createElement('div', { children: document.createTextNode('자식의 자식') }) });
  }

  return createElement('div', { children: createElement('div', { children: document.createTextNode('새로운거다.') }) });
}
