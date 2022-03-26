export default class View {
  $el;

  constructor($el) {
    if (this.constructor === View)
      throw new Error('추상 클래스의 인스턴스를 만들 수 없습니다.');
    if (!$el) throw new Error('추상 멤버변수 $el 을 구현하지 않았습니다.');
    this.$el = $el;
  }

  init() {
    this.render();
    this.bindEvent();
    return this;
  }

  render() {
    throw new Error('추상 메소드 render 를 구현하지 않았습니다.');
  }

  bindEvent() {
    throw new Error('추상 메소드 bindEvent 를 구현하지 않았습니다.');
  }

  on(event, handler) {
    this.$el.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const customEvent = new CustomEvent(event, {
      detail: data,
    });

    this.$el.dispatchEvent(customEvent);
  }

  show() {
    this.$el.classList.remove('hide');
  }

  hide() {
    this.$el.classList.add('hide');
  }
}
