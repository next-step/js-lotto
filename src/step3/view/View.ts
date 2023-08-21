export default class View<T extends HTMLElement = HTMLElement> {
  protected $element: T;

  constructor(element: T) {
    this.validate(element);
    this.$element = element;
  }

  private validate(element: T) {
    if (!element) throw this.$element;
  }

  protected init(): void {}

  protected setEvent(): void {}

  public show() {
    this.$element.style.display = 'block';
    return this;
  }

  public hide() {
    this.$element.style.display = 'none';
    return this;
  }

  public on(event: string, eventHandler: (_event: Event) => void) {
    this.$element.addEventListener(event, eventHandler);
    return this;
  }

  public emit<U>(eventName: string, detail: U) {
    const event = new CustomEvent(eventName, { detail });
    this.$element.dispatchEvent(event);
    return this;
  }
}
