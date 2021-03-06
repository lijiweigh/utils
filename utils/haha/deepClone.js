// 递归方式
function deepClone(obj) {
    // if(obj instanceof RegExp) return new RegExp(obj);
    // if(obj instanceof Date) return new Date(obj);
    if(!(obj instanceof Object)) {
        return obj
    }

    let result = {}

    if(obj instanceof Array) {
        result = []
    }

    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(obj[key] instanceof Object) {
                result[key] = deepClone(obj[key])
            } else {
                result[key] = obj[key]
            }
            
        }
    }

    return result
}

// let o = {a: 2, b: "aaa", c: null, d: true, e: [1,2,3]}
// let c = deepClone2(o)
// c.a = 1
// c.b = "bbb"
// c.c = "null"
// c.d = "undefined"
// c.e.push(888)

// console.log(JSON.stringify(o))
// console.log(JSON.stringify(c))


// 循环方式

function deepClone2(obj) {
    if(!(obj instanceof Object)) {
        return obj
    }
    const root = obj instanceof Array ? [] : {}
    const stack = [
        {
            parent: root,
            key: undefined,
            data: obj
        }
    ]
    while(stack.length) {
        let node = stack.pop()
        let parent = node.parent
        let key = node.key
        let data = node.data
        let res = parent
        if(key !== undefined) {
            res = parent[key] = data instanceof Array ? [] : {}
        }
        for(let k in data) {
            if(data.hasOwnProperty(k)) {
                if(data[k] instanceof Object) {
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k]
                    })
                } else {
                    res[k] = data[k]
                }
            }
        }
    }

    return root
}
// 循环方式 破解循环引用

function deepClone3(obj) {
    if(!(obj instanceof Object)) {
        return obj
    }
    // 缓存已经拷贝的值
    let uniqueList = []
    const root = obj instanceof Array ? [] : {}
    const stack = [
        {
            parent: root,
            key: undefined,
            data: obj
        }
    ]
    while(stack.length) {
        let node = stack.pop()
        let parent = node.parent
        let key = node.key
        let data = node.data
        let res = parent
        
        if(key !== undefined) {
            res = parent[key] = data instanceof Array ? [] : {}
        }
        // 如果已经拷贝过了，就直接拿来用
        let unique = uniqueList.find(i => i.source === data) 
        if(unique) {
            parent[key] = unique.target
            continue
        }
        uniqueList.push({
            source: data,
            target: res
        })
        for(let k in data) {
            if(data.hasOwnProperty(k)) {
                if(data[k] instanceof Object) {
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k]
                    })
                } else {
                    res[k] = data[k]
                }
            }
        }
    }

    return root
}

// 广度优先
function deepClone4(obj) {
    // if(obj instanceof RegExp) return new RegExp(obj);
    // if(obj instanceof Date) return new Date(obj);
    if(!(obj instanceof Object)) {
        return obj
    }
    let unique = new WeakMap()
    let result = obj instanceof Array ? [] : {}
    let queue = [
        {
            parent: result,
            key: undefined,
            data: obj
        }
    ]

    while(queue.length) {
        let node = queue.pop()
        let {parent, key, data} = node
        let res = parent
        if(key !== undefined) {
            res = parent[key] = data instanceof Array ? [] : {}
        }
        let u = unique.get(data)
        if(u) {
            parent[key] = u
            continue
        }

        unique.set(data, res)
        // 对 symbol 类型key的支持
        let keys = Object.keys(data).concat(Object.getOwnPropertySymbols(data))
        for(let k of keys) {
            if(data[k] instanceof Object) {
                queue.unshift({
                    parent: res,
                    key: k,
                    data: data[k]
                })
            } else {
                res[k] = data[k]
            }
        }
    }
    return result
}

// 深度优先
function deepClone5(obj) {
    if(!(obj instanceof Object)) {
        return obj
    }
    let cache = new WeakMap()
    let result = obj instanceof Array ? [] : {}
    cache.set(obj, result)
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            visit(result, cache, key, obj[key])
        }
    }
    return result
}

function visit(result, cache, key, value) {
    if(!(value instanceof Object)) {
        return result[key] = value
    }
    if(cache.get(value)) {
        return result[key] = cache.get(value)
    }
    
    result[key] = value instanceof Array ? [] : {}
    cache.set(value, result[key])
    for(let k in value) {
        if(value.hasOwnProperty(k)) {
            visit(result[key], cache, k, value[k])
        }
    }
}

let b = {}
let a = {
    a1: b,
    a2: b
}
a.b = a
console.log(a)
console.log(a.b)
console.log(a.a1)
console.log(a.a2)
console.log("----------")
let c = deepClone5(a)
console.log(c.a1)
console.log(c.a2)
console.log(c.a1 === c.a2)
console.log(c.b)
console.log(c)