async function fn() {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 1000);
    })
    return true
}

(async function() {
    await fn()
    console.log("22222")
    return true
})()