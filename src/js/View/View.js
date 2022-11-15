export default class View {
 constructor(select) {
  this.$target = document.querySelector(select);
 }
 init() {
  this.render();
  this.setEvent();
 }

 setEvent() {}

 reRender() {
  this.$target.replaceChildren();
  this.render();
 }

 render() {
  this.$target.insertAdjacentHTML('beforeend', this.getTemplate());
 }

 addEvent(eventType, selector, callback) {
  const children = [...this.$target.querySelectorAll(selector)];
  const isTarget = (target) =>
   children.includes(target) || target.closest(selector);
  this.$target.addEventListener(eventType, (ev) => {
   if (ev.target) {
    if (!isTarget(ev.target)) return false;

    callback(ev);
   }
  });
 }

 getTemplate() {
  return '';
 }
}
