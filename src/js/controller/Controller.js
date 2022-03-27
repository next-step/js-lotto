export default class Controller {
  store;
  constructor($app, store) {
    if (this.constructor === Controller)
      throw new Error('추상 클래스의 인스턴스를 만들 수 없습니다.');

    if (!$app) throw new Error('추상 멤버변수 $app 을 구현하지 않았습니다.');

    if (!store) throw new Error('추상 멤버변수 store 을 구현하지 않았습니다.');

    this.store = store;

    this.initializeComponents($app);
    this.initializeState();
  }

  initializeComponents($app) {
    throw new Error('추상 메소드 initializeComponents 를 구현하지 않았습니다.');
  }

  initializeState() {
    throw new Error('추상 메소드 initializeState 를 구현하지 않았습니다.');
  }
}
