function fn1 (n) {
    if (n === 1 || n === 2) {
        return 1
    }

    return fn1(n - 1) + fn1(n - 2)
}

console.log(fn1(22))
console.log(fn2(22))
console.log(Fibonacci2(22))

function fn2 (n) {
    if (n === 1 || n === 2) {
        return 1
    }

    let pre = 1
    let cur = 1
    let next

    for (let i = 0; i < n - 2; i++) {
        next = pre + cur;
        ([pre, cur] = [cur, next])
    }

    return next

}

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if (n === 1 || n === 2) {
        return ac2
    }
    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
  }