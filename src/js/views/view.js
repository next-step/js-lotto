export default class View {
  element;

  constructor(element) {
    this.element = document.querySelector(element);
  }

  setEventHandler(events) {
    if (!events.length) {
      return;
    }

    events.forEach(e => {
      this.element.addEventListener(e.event, e.handler);
    });
  }
}
