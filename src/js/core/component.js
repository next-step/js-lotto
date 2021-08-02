const style = '<link rel="stylesheet" href="./src/css/index.css" />'

/**
 * MVVM ?
 */
export class Component extends HTMLElement {
  constructor({ template = '', data = {}, methods = {}, watcher = {}, mounted }) {
    super()

    // 부모로부터 받은 초기 프로퍼티 값 임시저장
    this.initialProps = Object.keys(watcher).map((key) => [key, this[key]])

    this.data = { ...data }
    this.methods = { ...methods }
    this.watcher = Object.entries(watcher).reduce((res, [key, fn]) => {
      res[key] = [fn]
      return res
    }, {})
    this.mounted = mounted
    this.props = {}

    // create DOM
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = `${template}${style}`

    this.defineProperties()
    this.bind()
  }

  defineProperties() {
    Object.defineProperties(this, {
      ...Object.keys(this.watcher).reduce((res, property) => {
        return {
          ...res,
          [property]: {
            set: (value) => {
              this.props[property] = value
              this.watcher[property].forEach((listener) => {
                listener.call(this, value, this[property])
              })
            },
            get: () => this.props[property],
          },
        }
      }, {}),
      props: {
        value: this.props,
      },
      // add proxy for watching data
      data: {
        value: new Proxy(this.data, {
          set: (target, property, value) => {
            this.watcher[property].forEach((listener) => {
              listener.call(this, value, target[property])
            })

            target[property] = value
            return true
          },
        }),
      },
      methods: {
        value: this.methods,
      },
      watcher: {
        value: new Proxy(this.watcher, {
          get(target, property) {
            if (!target[property]) target[property] = []
            return target[property]
          },
        }),
      },
      emit: {
        value: (type = '', detail) => {
          const event = new CustomEvent(type, { detail })
          this.dispatchEvent(event)
        },
      },
      mounted: {
        value: this.mounted,
      },
      ref: {
        value: {},
      },
    })
  }

  /**
   * Binder
   */
  bind() {
    const elements = this.root.querySelectorAll('*')

    elements.forEach((el) => {
      const attributes = el.getAttributeNames()
      attributes.forEach((attr) => {
        if (attr.startsWith('@')) this.bindEvent({ el, attr })
        if (attr.startsWith('data-attr-')) this.bindAttribute({ el, attr })
        if (attr.startsWith('data-prop-')) this.bindProperty({ el, attr })
        if (attr === 'data-ref') this.bindRef({ el, attr })
      })
    })
  }

  bindEvent({ el, attr }) {
    const eventName = attr.slice(1)
    const handler = el.getAttribute(attr)

    el.addEventListener(eventName, this.methods[handler].bind(this))
  }

  bindAttribute({ el, attr }) {
    const bindedProperty = el.getAttribute(attr)
    const [targetAttribute] = attr.split('-').slice(-1)

    this.watcher[bindedProperty].push((nextValue) => {
      el.setAttribute(targetAttribute, nextValue)
    })
  }

  bindProperty({ el, attr }) {
    const bindedProperty = el.getAttribute(attr)
    const [targetProperty] = attr.split('-').slice(-1)

    this.watcher[bindedProperty].push((nextValue) => {
      el[targetProperty] = nextValue
    })
    // 초기 프로퍼티 값 설정
    el[targetProperty] = this.data[bindedProperty]
  }

  bindRef({ el, attr }) {
    const refName = el.getAttribute(attr)
    this.ref[refName] = el
  }

  /**
   * Mounted hook
   */
  connectedCallback() {
    // 초기 데이터 프로퍼티에 대한 watcher 실행
    Object.keys(this.data).forEach((key) => {
      const value = this.data[key]
      this.watcher[key].forEach((listener) => {
        listener.call(this, value, value)
      })
    })
    // 초기 props 재지정
    this.initialProps.forEach(([key, val]) => {
      this[key] = val
    })

    // execute mounted callback
    if (this.mounted) this.mounted()
  }
}
