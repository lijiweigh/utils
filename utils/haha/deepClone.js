function deepClone(obj) {
    let type = Object.prototype.toString.call(obj)
    let result
    if(type === "[object Object]") {
        result = {}
    } else if(type === "[object Array]") {
        result = []
    } else {
        return obj
    }
    for(let key in obj) {
        result[key] = deepClone(obj[key])
    }
    return result
}

export default deepClone

// let obj = {a: 2, b: 2, c: [2]}
// let arr = [2,3,{a: 33}]

// let obj2 = deepClone(obj)
// let arr2 = deepClone(arr)
// obj2.c[0] = 3333
// arr2[2].a = 6666
// console.log(obj2)
// console.log(arr2)