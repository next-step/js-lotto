export default class Component {
  constructor($target) {
    this.$target = $target
    this.setup()
    this.setEvent()
    this.render()
  }

  setup() {}

  template() {
    return ''
  }

  setEvent() {}

  render() {
    this.$target.innerHTML = this.template()
  }
}
