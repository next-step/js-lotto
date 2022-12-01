export default class Subject {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notice(observer) {
    observer.render();
  }

  notifyAll() {
    this.observers.forEach(observer => this.notice(observer));
  }
}
