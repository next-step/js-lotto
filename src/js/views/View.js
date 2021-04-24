class View {
    constructor(targetEl) {
        this.targetEl = targetEl;
    }

    show() {
        this.targetEl.style.display = "block";
        return this;
    }

    hide() {
        this.targetEl.style.display = "none";
        return this;
    }

    on(event, eventHandler) {
        this.targetEl.addEventListener(event, eventHandler);
        return this;
    }

    emit(event, detail) {
        const customEvent = new CustomEvent(event, { detail });
        this.targetEl.dispatchEvent(customEvent);
        return this;
    }
}

export default View
