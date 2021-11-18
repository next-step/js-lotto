const eventErrorCatcher = (handler) => (e) => {
    try {
        handler(e);
    }
    catch (err) {
        console.error(err);
        window.alert(err.message);
    }
};
export default class View extends HTMLElement {
    #events = new Map();
    on(eventType, handler) {
        let cb = this.#events.get(handler);
        if (!cb) {
            cb = eventErrorCatcher(handler);
            this.#events.set(handler, cb);
        }
        this.addEventListener(eventType, cb);
        return this;
    }
    off(eventType, handler) {
        const cb = this.#events.get(handler);
        this.removeEventListener(eventType, cb);
        return this;
    }
    emit(eventType, data = {}) {
        const event = new CustomEvent(eventType, { detail: data, bubbles: true });
        this.dispatchEvent(event);
        return this;
    }
    hide() {
        this.style.display = 'none';
        return this;
    }
    show() {
        this.style.display = '';
        return this;
    }
}
//# sourceMappingURL=index.js.map