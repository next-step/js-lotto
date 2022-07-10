export const $ = {
  qs: (selector) => document.querySelector(selector),
  create: (tag) => document.createElement(tag),
};

Element.prototype.addClass = function (...classes) {
  classes.forEach((name) => this.classList.add(name));
  return this;
};

Element.prototype.removeClass = function (...classes) {
  classes.forEach((name) => this.classList.remove(name));
  return this;
};

Element.prototype.setHTML = function (html) {
  this.innerHTML = html;
  return this;
};
