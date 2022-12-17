export const render = (target, data) => {
  target.innerHTML = ''
  if (Array.isArray(data)) {
    data.forEach((item) => target.insertAdjacentHTML('beforeend', item))
  } else {
    target.innerHTML = item
  }
}
