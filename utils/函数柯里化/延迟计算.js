const add = (...args) => args.reduce((a, b) => a + b)

function delay(func) {
    let args = []
    return function result(...rest) {
        if(rest.length === 0) {
            return func(...args)
        } else {
            args.push(...rest)
            return result
        }
    }
}

let sum = delay(add)

console.log(sum(1, 2, 3))
console.log(sum(5))
console.log(sum())
