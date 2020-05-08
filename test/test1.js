let a = {
    a: 22,
    b: 33
}

let b = new Proxy(a, {
    get(target, key, receiver) {
        console.log(target, key)
        if(key === "a") {
            return "aa"
        }
    }
})

console.log(b.c)