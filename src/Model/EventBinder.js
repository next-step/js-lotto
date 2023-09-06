export class EventBinder {
  onSubmit(element, callbackEvent) {
    element.addEventListener('submit', (event) => {
      event.preventDefault();
      callbackEvent(event);
    });
  }

  onChange(element, callbackEvent) {
    element.addEventListener('change', (event) => {
      event.preventDefault();
      callbackEvent(event);
    });
  }

  onChange(element, callbackEvent) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      callbackEvent(event);
    });
  }
}
