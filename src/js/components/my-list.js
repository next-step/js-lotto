import { Component } from '../core/component.js'

const template = `
  <section>
    <h3>hi</h3>
    <input type="text" @input="onInput" data-model-value="inputText" />
  </section>
`
class MyList extends Component {
  constructor() {
    super({
      template,
      data: {
        inputText: '',
      },
      methods: {
        onInput(e) {
          this.data.inputText = e.target.value
        },
      },
    })
  }
}

window.customElements.define('my-list', MyList)
