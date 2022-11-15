export default class Observer {
 constructor() {
  this._observers = new Set();
 }
 subscribe(observer) {
  this._observers.add(observer);
 }
 notify() {
  this._observers.forEach((observer) => observer());
 }
}
