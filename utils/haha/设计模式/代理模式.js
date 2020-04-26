class Person {
    getName(type, cb) {
        setTimeout(() => {
            switch(type) {
                case 1: return cb("tom")
                case 2: return cb("jack")
                case 3: return cb("mike")
            }
        }, 2000);
    }
}

class PersonProxy {
    constructor() {
        this.Person = new Person()
        this.cache = {}
    }
    getName(type) {
        if(this.cache[type]) {
            console.log("get from cache")
            return this.cache[type]
        } else {
            console.log("get from run")
            this.Person.getName(type, (v) => {
                this.cache[type] = v
            })
        }
    }
}

let p = new PersonProxy()

p.getName(1)
p.getName(2)
p.getName(3)
setTimeout(() => {
    p.getName(1)
    p.getName(2)
    p.getName(3)
}, 3000);