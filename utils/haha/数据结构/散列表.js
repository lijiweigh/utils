// import { LinkedList }  from "./链表"
let { LinkedList } = require("./链表")

// 使用 loselose 散列函数计算 key，并以此存储 value
// 缺点：key值的计算结果一样时，后值会覆盖前面的值
class HashMap {
    constructor() {
        this.table = []
    }

    put(key, value) {
        key = hashFunction(key)
        this.table[key] = value
    }

    get(key) {
        key = hashFunction(key)
        return this.table[key]
    }

    remove(key) {
        key = hashFunction(key)
        if (this.table[key]) {
            delete this.table[key]
            return false
        }

        return false
    }
}

/**
 *
 * 解决方法：1. 分离链接
 * 用链表在存储每个位置的值
 *
 * 2. 索引增加
 * 3. 冲突的时候，用另一个散列函数再计算
 * 4. 创建正常的池和溢出池
 */

class toValue {
    constructor(key, value) {
        this.key = key
        this.value = value
    }

    toString() {
        return `[${this.key} : ${this.value}]`
    }
}

class HashMap2 {
    constructor() {
        this.table = []
    }

    put(key, value) {
        let pos = hashFunction(key)
        let ll = this.table[pos]
        if (!ll) {
            ll = new LinkedList()
            this.table[pos] = ll
        }

        ll.append(new toValue(key, value))
    }

    get(key) {
        let pos = hashFunction(key)
        let ll = this.table[pos]
        if (ll) {
            for (let cur = ll.getHead(); ; ) {
                if (cur.element.key === key) {
                    return cur.element.value
                }
                cur = cur.next()
                if (cur.next === null) {
                    break
                }
            }
        }

        return undefined
    }

    remove(key) {
        let pos = hashFunction(key)
        let ll = this.table[pos]
        if (ll) {
            for (let cur = ll.getHead(); ; ) {
                if (cur.element.key === key) {
                    ll.remove(cur.element)
                    if (ll.isEmpty()) {
                        this.table[pos] = undefined
                    }
                    return true
                }
                cur = cur.next()
                if (cur.next === null) {
                    break
                }
            }
        }
        return false
    }
}

class HashSet {
    constructor() {
        this.set = []
    }

    add(value) {
        let pos = djb2HashCode(value)
        let s = this.set[pos]
        if (!s) {
            s = new LinkedList()
        }
        s.append(value)
    }

    remove(value) {
        let pos = djb2HashCode(value)
        let s = this.set[pos]
        if (s) {
            for (let cur = s.getHead(); ; ) {
                if (cur.element === value) {
                    s.remove(cur.element)
                    if (s.isEmpty()) {
                        this.set[pos] = undefined
                    }
                    return true
                }

                cur = cur.next()
                if (cur.next === null) {
                    break
                }
            }
        }

        return false
    }
}

function hashFunction(key) {
    let result = ""
    for (let i = 0; i < key.length; i++) {
        result += key.charCodeAt(i)
    }
    return result % 37
}

// 更好的散列函数
function djb2HashCode(key) {
    var hash = 5381 //{1}
    for (var i = 0; i < key.length; i++) {
        //{2}
        hash = hash * 33 + key.charCodeAt(i) //{3}
    }
    return hash % 1013 //{4}
}

exports.HashMap = HashMap2

// let h = new HashMap ()
// h.put ("a", {a: 2})
// console.log(h.get("a"))
// h.remove ("a")
// console.log(h.get ("a"))

// let h  = new HashMap2 ()
// h.put ("a", "abc")
// console.log(h)
// console.log(h.get ("a"))
