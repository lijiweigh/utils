// let fs = require("fs")

// Function.prototype.myfn = function (context) {
//     console.log(this.name)
//     context.fn = this
//     context.fn()
// }

// let a = {
//     fn () {
//         console.log(this)
//     }
// }

// let b = {
//     name: "b"
// }

// a.fn.myfn (b)

// let reg = /[^\w.$]/

// console.log(__filename)
// console.log(__dirname)

// fs.stat("./a.txt", function (err, stats) {
//     if (err) {
//         console.log(err)
//     }
// })

// async function testAsync() {
//     let data = await new Promise(resolve => {
//         // setTimeout(() => {
            
//             let b = a
//             resolve(b)
            
//             console.log("after error")
//         // }, 100);
//     }).catch(e => {
//         console.log(e.message)
//     })
    
// }

// testAsync()



// onerror = function(err) {
//     console.log(err)
// }

// console.log(this)

console.log("111111");

(async () => {
    await Promise.resolve()
    console.log("22222")
})()

console.log("33333")


function deepClone(obj) {
    if(!(obj instanceof Object)) {
        return obj
    }
    let result = {}
    if(obj instanceof Array) {
        result = []
    }
    for(let key of Object.keys(obj)) {
        let v = obj[key]
        if(v instanceof Object) {
            result[key] = deepClone(v)
        } else {
            result[key] = v
        }
    }
    return result
}

function deepClone2(obj) {
    if(!(obj instanceof Object)) {
        return obj
    }
    let cache = new WeakMap()
    let result = obj instanceof Array ? [] : {}
    let stack = [{
        parent: result,
        key: undefined,
        data: obj
    }]
    while(stack.length) {
        let {parent, key, data} = stack.pop()
        let res = parent
        if(key !== undefined) {
            res = parent[key] = data instanceof Array ? [] : {}
        }
        let u = cache.get(data)
        if(u) {
            parent[key] = u
            continue
        }
        cache.set(data, res)
        let keys = Object.keys(data).concat(Object.getOwnPropertySymbols(data))
        for(let k of keys) {
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
    return result
}