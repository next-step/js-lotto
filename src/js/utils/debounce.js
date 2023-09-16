const DEFAULT_TIMEOUT = 0

export const debounce = (func, timeout = DEFAULT_TIMEOUT) => {
  let timer

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
