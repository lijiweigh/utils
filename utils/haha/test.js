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