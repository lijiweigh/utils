function curry(fn, args = []) {
    return function() {
        let rest = [...args, ...arguments]
        if(rest.length < fn.length) {
            return curry.call(this, fn, rest)
        } else {
            return fn.apply(this, rest)
        }
    }
}

function sum(a, b, c) {
    return a + b + c
}

function curry2(fn) {
    let args = []
    return function save() {
        if(arguments.length > 0) {
            args.push(...arguments)
            return save
        } else {
            return fn.apply(this, args)
        }
    }
}

function sum2() {
    return [...arguments].reduce((sum, a) => {
        return sum + a
    })
}

// let s = curry(sum)

// console.log(s(1, 2, 3))
// console.log(s(1)(2)(3))

let s2  = curry2(sum2)

console.log(s2(1))
console.log(s2(2, 3, 4))
console.log(s2(5))
console.log(s2())