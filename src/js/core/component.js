const style = '<link rel="stylesheet" href="./src/css/index.css" />'

export class Component extends HTMLElement {
  constructor({ template = '', data = {}, methods = {} }) {
    super()

    this.data = { ...data }
    this.methods = { ...methods }
    this.watcher = {}

    // create DOM
    this.root = this.attachShadow({ mode: 'closed' })
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
        if (attr.startsWith('@')) this.bindEvents({ el, attr })
        if (attr.startsWith('data-model-')) this.bindModels({ el, attr })
      })
    })
  }

  bindEvents({ el, attr }) {
    const event = attr.slice(1)
    const handler = el.getAttribute(attr)

    el.addEventListener(event, this.methods[handler].bind(this))
  }

  bindModels({ el, attr }) {
    const prop = el.getAttribute(attr)
    const [attributeName] = attr.split('-').slice(-1)

    this.watcher[prop].push((nextValue) => {
      el[attributeName] = nextValue
    })
  }
}
