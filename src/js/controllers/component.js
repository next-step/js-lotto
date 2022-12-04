export class Component {
    _view;
    _stateModel;
    _validator;

    constructor(container) {
        this._view = container.view;
        this._stateModel = container.state;
        this._validator = container.validator;
    }

    _setEventListeners() {}
    _setEventHandler() {}
    _subscribe() {}
    _reset() {}
    _submitByEnterKey(e) {}
    _initElement() {}

    _restart() {
        this._initElement();
    }

    init() {
        this._setEventListeners();
        this._setEventHandler();
        this._subscribe()
        this._initElement();
    }

}