export default class View {
  element;
  events;

  constructor(element) {
    this.element = document.querySelector(element);
  }

  setEventHandler() {
    if (!this.events.length) {
      return;
    }

    this.events.forEach(e => {
      e.target.addEventListener(e.event, e.handler);
    });
  }
}
