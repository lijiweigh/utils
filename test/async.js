// async function fn() {
//     await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(1)
//         }, 1000);
//     })
//     return true
// }

// console.log("1111");

// (async () => {
//     await fn()
//     console.log("22222")
//     return true
// })();

// console.log("3333")

async function fn2() {
    // console.log("aa")
    // return await Promise.resolve("resolve")
    await 1
}

let data = fn2()

console.log(data)
console.log(data.then())