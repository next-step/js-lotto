export const getEl = (selector, target = document) => {
  const element = target.querySelector(selector)
  return element
}

export const getAllEl = (selector, target = document) => {
  const element = target.querySelectorAll(selector)
  return element
}

export const createEl = htmlText => {
  const componentChildren = Array.from(
    new DOMParser().parseFromString(htmlText, 'text/html').body.children
  )
  const component = new DocumentFragment()
  component.append(...componentChildren)

  return component.children[0]
}

export const render = (element, target, isReplace = false) => {
  if (isReplace) {
    target.innerHTML = element
    return
  }

  target.append(element)
}
