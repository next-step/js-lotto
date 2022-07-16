class Observable {
  constructor() {
    this.observers = {};
  }

  subscribe(key, callback) {
    this.observers[key] = callback;
  }

  unsubscribe(key) {
    try {
      delete this.observers[key];
    } catch (error) {
      console.log(error);
    }
  }

  notify(key, args) {
    this.observers[key](args);
  }
}

export default new Observable();
