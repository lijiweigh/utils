class Publisher {
    constructor() {
        this.observers = []
    }

    addObservers(o) {
        this.observers.push(o)
    }
    removeObservers(o) {
        this.observers = this.observers.filter(i => i !== o)
    }
    notify(data) {
        this.observers.forEach(o => {
            o.update(data)
        })
    }
}

class Observer {
    constructor() {
        console.log("hahaha")
    }
    update(data) {
        console.log(data)
    }
}