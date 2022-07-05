export const $ = function (selector) {document.querySelector(selector)};
export const $$ = function (selector) {document.querySelectorAll(selector)};
export const addEvent = function(target, eventType, callback) {target.addEventListener(eventType, callback)};