class Set {
    constructor () {
        this.length = 0
        this.items = {}
    }

    has (key) {
        // return this.items.hasOwnProperty(key)
        return key in this.items
    }

    add (item) {
        if (!this.has(item)) {
            // 对象类型的值不能重复存储，因为内部键值都会变成 [Object, Object]
            this.items[item] = item
            this.length++
            return true
        }

        return false
    }

    size() {
        return this.length
    }

    delete (item) {
        if (this.has(item)) {
            delete (this.items[item])
            this.length--
            return true
        }

        return false
    }

    clear () {
        this.items = {}
        this.length = 0
    }

    keys () {
        return Object.getOwnPropertyNames(this.items)
    }

    values () {
        return Object.getOwnPropertyNames(this.items)
    }

    // 交集
    union (setB) {
        let unionSet = new Set()
        let keys = this.keys()
        for (let i = 0; i < keys.length; i++) {
            unionSet.add(keys[i])
        }

        keys = setB.keys()
        for (let i = 0; i < keys.length; i++) {
            unionSet.add(keys[i])
        }

        return unionSet
    }
}


let s = new Set ()
console.log(s.has(2))
s.add(2)
s.add(3)
console.log(s.has(3))
console.log(s.size())
s.delete (2)
console.log(s.keys())
console.log(s.values())
s.clear()
console.log(s.keys())


