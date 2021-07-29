const style = '<link rel="stylesheet" href="./src/css/index.css" />'

export class Component extends HTMLElement {
  constructor({ template = '', data = {}, methods = {}, mounted }) {
    super()

    this.data = { ...data }
    this.methods = { ...methods }
    this.watcher = {}
    this.mounted = mounted

    // create DOM
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = `${template}${style}`

    this.defineProperties()
  }

  defineProperties() {
    Object.defineProperties(this, {
      data: {
        value: new Proxy(this.data, {
          set: (target, property, value) => {
            this.watcher[property].forEach((listener) => {
              listener(value, target[property])
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
    })
  }

  /**
   * Mounted
   */
  connectedCallback() {
    const elements = this.root.querySelectorAll('*')

    elements.forEach((el) => {
      const attributes = el.getAttributeNames()
      attributes.forEach((attr) => {
        if (attr.startsWith('@')) this.bindEvent({ el, attr })
        if (attr.startsWith('data-attr-')) this.bindAttribute({ el, attr })
        if (attr.startsWith('data-prop-')) this.bindProperty({ el, attr })
      })
    })

    Object.keys(this.data).forEach((key) => {
      const value = this.data[key]
      this.watcher[key].forEach((listener) => {
        listener(value, value)
      })
    })

    if (this.mounted) this.mounted()
  }

  bindEvent({ el, attr }) {
    const event = attr.slice(1)
    const handler = el.getAttribute(attr)

    el.addEventListener(event, this.methods[handler].bind(this))
  }

  bindAttribute({ el, attr }) {
    const prop = el.getAttribute(attr)
    const [attributeName] = attr.split('-').slice(-1)

    this.watcher[prop].push((nextValue) => {
      el.setAttribute(attributeName, nextValue)
    })
  }

  bindProperty({ el, attr }) {
    const prop = el.getAttribute(attr)
    const [propertyName] = attr.split('-').slice(-1)

    this.watcher[prop].push((nextValue) => {
      console.log(el, propertyName, nextValue)
      el[propertyName] = nextValue
    })
  }
}
