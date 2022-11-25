export class Component {
    _view;
    _stateModel;

    constructor(view, state) {
        this._view = view;
        this._stateModel = state;
    }

    _setEventListeners() {}
    _setEventHandler() {}
    _subscribe() {}

    init() {
        this._setEventListeners();
        this._setEventHandler();
        this._subscribe()
    }

    reset() {}
}