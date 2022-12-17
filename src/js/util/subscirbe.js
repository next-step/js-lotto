export class Subject {
  constructor() {
    this.observers = []
  }

  registerObserver(observer) {
    this.observers.push(observer)
  }

  unregisterObserver(observer) {
    this.observers = this.observers.filter((registeredObserver) => registeredObserver !== observer)
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer(data))
  }
}
