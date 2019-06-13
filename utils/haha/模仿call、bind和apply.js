Function.prototype.myCall = function (context) {
    let caller = context || window

    caller.fn = this

    let args = [...arguments].slice(1)

    let result = caller.fn(...args)

    delete caller.fn

    return result

}

Function.prototype.myApply = function (context) {
    let caller = context || window

    caller.fn = this

    let result 

    if (arguments[1]) {
        result = caller.fn (...arguments[1])
    } else {
        result = caller.fn()
    }

    delete caller.fn

    return result

}

Function.prototype.myBind = function (context) {
    let fn = this

    let args = [...arguments].slice[1]

    return function F () {
        if (this instanceof F) {
            return new fn(...args, ...arguments)
        } 

        return fn.apply (context, args.concat(...arguments))
    }
}