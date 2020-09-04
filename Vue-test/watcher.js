import Dep from "./dep"

class Watcher {
    constructor(vm, fn, cb) {
        this.vm = vm
        this.cb = cb
        this.getter = fn

        this.value = this.get()
    }

    get() {
        Dep.target = this
        let value = this.getter.call(this.vm)
        return value
    }

    addDep(dep) {
        dep.addSubs(this)
    }

    update() {
        this.run()
    }

    run() {
        let value = this.get()
        let oldValue = this.value
        this.value = value
        this.cb && this.cb.call(this.vm, value, oldValue)
    }
}