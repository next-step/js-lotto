import { Elem } from './constants.js'

const template = document.createElement('template')

const createElem = (elem: Elem): HTMLElement => {
  if (elem instanceof HTMLElement) return elem
  template.replaceChildren()
  template.insertAdjacentHTML('afterbegin', elem)
  return template.firstElementChild as HTMLElement
}

const el = (parent: Elem, children: Elem[] = []): HTMLElement => {
  const parentElem = createElem(parent)
  if (children.length) {
    const frag = document.createDocumentFragment()
    children.forEach(elem => {
      if (elem instanceof String && !elem.startsWith('<')) frag.append(elem)
      else frag.appendChild(createElem(elem))
    })
    parentElem.replaceChildren(frag)
  }
  return parentElem
}

export default el
