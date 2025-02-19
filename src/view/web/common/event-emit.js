export const submitEventReceivedComponents = [
  "number-box",
  "purchase-history",
  "money-input",
];

export const resetEventReceivedComponents = [
  "number-box",
  "purchase-history",
  "money-input",
  "winning-detail",
];

export const SUBMIT_EVENT = "submit-event";
export const RESTART_EVENT = "restart-event";

export const eventEmit = (eventName, components) => {
  const event = new CustomEvent(eventName, {
    composed: true,
  });

  components.forEach((componentName) => {
    const target = document.querySelector(componentName);
    target.shadowRoot.dispatchEvent(event);
  });
};
