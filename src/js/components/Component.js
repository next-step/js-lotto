import Observer from "../core/Observer.js"

export default class Component extends Observer{
    constructor({component, state, store}) {
        super()
        const self = this
        this._state = state ? new Proxy(state, {
            set(target, prop, value){
                if(prop in target) {
                    target[prop] = value
                    self.render()
                    return true
                }
            },
            get(target, prop){
                if(prop in target) {
                    return target[prop]
                }
                return undefined
            }
        })
        : null
        this.$component = component
        this.store = store
        this.render()

    }

    
    get state() {
        return this._state
    }


    set state(state) {
        Object.keys(state)
        .forEach(key => {
            this._state[key] = state[key]
        })
    }

    update() {
        this.render()
    }
    render() {
        if(this.$component) {
            this.$component.innerHTML = this.template()
        }
    }
}