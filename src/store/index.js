export default class Store {
    constructor() {
      this.observers = [];
    }
    registerObserver(...newObservers) {
      newObservers.forEach((observer) => this.observers.push(observer));
    }
    unregisterObserver(targetObserver) {
      this.observers = this.observers.filter((observer) => {
        return observer !== targetObserver;
      });
    }
    notifyObservers(message) {
      this.observers.forEach((observer) => {
        observer.render(message);
      });
    }
  }
  