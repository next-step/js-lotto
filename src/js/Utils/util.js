export const selector = (target, parent = document) => parent.querySelector(target)
export const allSelectors = (target, parent = document) => parent.querySelectorAll(target)
export const createEl = (tag, classList = '') => {
  const el = document.createElement(tag)
  const elStyle = classList.split(' ')
  el.classList.add(...elStyle)
  return el
}
export const MatchNumberOrder = {
  3: 'fifth',
  4: 'fourth',
  5: 'third',
  6: 'first',
  7: 'second'
}

