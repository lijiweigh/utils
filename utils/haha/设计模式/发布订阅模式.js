let list = []

function on (key, cal) {
    if (!list[key]) {
        list[key] = []
    }

    list[key].push(cal)
}

function emit (key, data) {
    let fns = list[key]
    let len = fns.length
    if (!fns || len == 0) {
        return 
    }

    // 执行顺序为后绑定的先执行
    while (len > 0) {
        fns[len--](data)
    }
}

function off (key, cal) {
    let fns = list[key]
    if (!fns || fns.length == 0) {
        return
    }

    if (!cal) {
        fns = []
    } else {
        let index = fns.indexOf(cal)
        if (index < 0) {
            return 
        }
        fns.splice(index, 1)
    }

}


class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(name, cb) {
        if(!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(cb)
    }
    emit(name, ...args) {
        let cbs = this.events[name]
        if(cbs) {
            cbs.forEach(cb => cb(...args))
        }
    }
    off(name, cb) {
        if(name === undefined) {
            this.events = {}
        }
        if(cb === undefined) {
            this.events[name] = []
        }
        let cbs = this.events[name]
        if(cbs) {
            let len = cbs.length
            while(len--) {
                if(cbs[len] === cb || cbs[len].cb === cb) {
                    cbs.splice(len, 1)
                }
            }
        }
        
    }
    once(name, cb) {
        const wraper = (...args) => {
            cb(...args)
            this.off(name, wraper)
        }
        wraper.cb = cb
        this.on(name, wraper)
    }
}