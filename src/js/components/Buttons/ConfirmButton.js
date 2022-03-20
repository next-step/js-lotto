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
    const $confirmBtn = document.querySelector('#confirm-button');
    this.$confirmBtn = $confirmBtn.cloneNode(true);
    $confirmBtn.after(this.$confirmBtn);
    $confirmBtn.remove()

    this.addEvent(this.$confirmBtn, 'click', this.handleClick);
  }

  addEvent($el, event, callbackFn) {
    $el.addEventListener(event, callbackFn);
  }
}