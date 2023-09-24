export const removeEvent = ($target, eventType, listener) => {
  $target.removeEventListener(eventType, listener);
};

export const addEvent = ($target, eventType, listener) => {
  removeEvent($target, eventType, listener);
  $target.addEventListener(eventType, listener);
};
