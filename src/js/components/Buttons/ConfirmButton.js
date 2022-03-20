export default class ConfirmButton {
  constructor({inputPrice, onClick}) {
   this.$confirmBtn = null;
   this.inputVal = inputPrice;
   this.handleClick = onClick;
   this.setState();
  }

  setState() {
    this.render();
  }

  render() {
    console.log("btn", this.inputVal)
    this.$confirmBtn = document.querySelector('#confirm-button');
    this.addEvent(this.$confirmBtn, 'click', () => this.handleClick(this.inputVal));
  }

  addEvent($el, event, callbackFn) {
    $el.addEventListener(event, callbackFn);
  }
}