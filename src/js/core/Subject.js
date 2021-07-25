import { STEP_NUMBER } from "../utils/constants.js"

export default class Subject {
    constructor({store, initFn}) {
        this.observers = []
        const self = this
        this.init = initFn
        this.store = new Proxy(store, {
            get(target, prop) {
                return target[prop]
            },
            set(target, prop, value) {
                if(prop in target && target[prop] !== value) {
                    target[prop] = value
                    self.publish(prop)
                    return true
                } else if(prop === 'step' && target[prop] === value) {
                    return true
                }
                return false
            }
        })
    }
    subscribe({observer, state}) {
        this.observers.push({observer, state})
    }
    publish(state) {
        this.observers
        .forEach(obj => {
            const idx = obj.state.indexOf(state)
            if(idx !== -1) {
                console.log(`publish!! ${state} => `, obj.observer)
                obj.observer.update(this.store[obj.state[idx]])
            }
        })
    }
}