import Dep from "./dep"

class Observer {
    constructor(value) {
        this.walk(value)
    }

    walk(value) {
        let keys = Object.keys(value)
        for(let i = 0; i < keys.length; i++) {
            defineReactive(value, keys[i])
        }
    }
}

function defineReactive(obj, key) {
    let dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            if(Dep.target) {
                dep.depend()
            }
            return obj[key]
        },
        set(newVal) {
            obj[key] = newVal
            dep.notify()
        }
    })
}