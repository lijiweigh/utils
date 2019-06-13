let fs = require("fs")

Function.prototype.myfn = function (context) {
    // console.log(this)
    context.fn = this
    context.fn()
}

let a = {
    fn () {
        console.log(this)
    }
}

let b = {
    name: "b"
}

a.fn.myfn (b)

let reg = /[^\w.$]/

console.log(__filename)
console.log(__dirname)

fs.stat("./a.txt", function (err, stats) {
    if (err) {
        console.log(err)
    }
})