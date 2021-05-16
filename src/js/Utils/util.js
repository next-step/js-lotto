export const selector = (target, parent = document) => parent.querySelector(target)
export const allSelectors = (target, parent = document) => parent.querySelectorAll(target)
export const createEl = (tag, classList = '') => {
  const el = document.createElement(tag)
  const elStyle = classList.split(' ')
  el.classList.add(...elStyle)
  return el
}
export const MatchNumberOrder = {
  3: {
    label: 'fifth',
    price: 5000
  },
  4: {
    label: 'fourth',
    price: 50000
  },
  5: {
    label: 'third',
    price: 1500000
  },
  5.5: {
    label: 'second',
    price: 30000000
  },
  6: {
    label: 'first',
    price: 2000000000
  },
}

export const LOTTO_PRICE = 1000

