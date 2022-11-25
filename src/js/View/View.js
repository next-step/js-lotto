export default class View {
 constructor(target) {
  this.$target = target;
  this.children = [];
 }
 init() {
  this.render();
  this.setEvent();
 }

 setEvent() {}

 render() {
  if (this.$target.children.length !== 0) {
   this.$target.replaceChildren();
  }
  this.$target.insertAdjacentHTML('beforeend', this.getTemplate());
 }

 addEvent(eventType, selector, callback) {
  const children = [...this.$target.querySelectorAll(selector)];
  const isTarget = (target) =>
   children.includes(target) || target.closest(selector);
  this.$target.addEventListener(eventType, (ev) => {
   if (ev.target) {
    console.dir(ev.target);
    if (!isTarget(ev.target)) return false;

    callback(ev);
   }
  });
 }

 getTemplate() {
  return '';
 }
}
