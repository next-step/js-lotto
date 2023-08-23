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

  /**
   * 특정 View를 렌더링 하는 메서드
   * @returns {this} 특정 View의 인스턴스
   */
  public show(): this {
    this.$element.style.display = 'block';
    return this;
  }

  /**
   * 특정 View를 감추는 메서드
   * @returns {this} 특정 View의 인스턴스
   */
  public hide(): this {
    this.$element.style.display = 'none';
    return this;
  }

  /**
   * 특정 View에서 받은 Event를 등록 하는 메서드
   * @param {string} eventName - 이벤트 이름
   * @param {(_event: Event) => void} eventHandler - 이벤트 핸들러
   * @returns {this} 특정 View의 인스턴스
   */
  public on(eventName: string, eventHandler: (_event: Event) => void): this {
    this.$element.addEventListener(eventName, eventHandler);
    return this;
  }

  /**
   * customEvent를 발생시킨 후 데이터를 함께 전달하는 메서드
   * @param {string} eventName - 이벤트 이름
   * @param {U} detail - CustomEvent에 추가 할 data
   * @returns {this} 특정 View의 인스턴스
   */
  public emit<U>(eventName: string, detail: U): this {
    const event = new CustomEvent(eventName, { detail });
    this.$element.dispatchEvent(event);
    return this;
  }
}
