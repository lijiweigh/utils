let id = 0

class Dep {
    constructor() {
        this.id = id++
        this.subs = []
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    depend() {
        // Dep.target 将来会被赋值为一个 watcher 实例
        if(Dep.target) {
            Dep.target.addDep(this)
        }
    }
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}

Dep.target = null