async function fn() {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 1000);
    })
    return true
}

console.log("1111");

(async () => {
    await fn()
    console.log("22222")
    return true
})();

console.log("3333")