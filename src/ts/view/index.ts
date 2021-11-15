import { AnyObj } from '../constants.js'

const eventErrorCatcher = (handler: any) => (e: Event) => {
  try {
    handler(e)
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export default class View extends HTMLElement {
  #events = new Map()

  on(eventType: string, handler: (e: Event) => any) {
    let cb = this.#events.get(handler)
    if (!cb) {
      cb = eventErrorCatcher(handler)
      this.#events.set(handler, cb)
    }
    this.addEventListener(eventType, cb)
    return this
  }
  off(eventType: string, handler: (e: Event) => any) {
    const cb = this.#events.get(handler)
    this.removeEventListener(eventType, cb)
    return this
  }
  emit(eventType: string, data: AnyObj = {}) {
    const event = new CustomEvent(eventType, { detail: data, bubbles: true })
    this.dispatchEvent(event)
    return this
  }
  hide() {
    this.style.display = 'none'
    return this
  }
  show() {
    this.style.display = ''
    return this
  }
}
