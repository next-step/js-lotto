class View {
    constructor(targetEl) {
        this.targetEl = targetEl;
    }

    init() { }

    reset() { }

    show() {
        this.targetEl.style.display = 'block';
        return this;
    }

    hide() {
        this.targetEl.style.display = 'none';
        return this;
    }

    on(event, eventCallback) {
        this.targetEl.addEventListener(event, eventCallback);
    }

    emit(event, detail) {
        const customEvent = new CustomEvent(event, { detail });
        this.targetEl.dispatchEvent(customEvent);
    }
}

export default View
