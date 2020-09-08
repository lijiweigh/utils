function flat (arr) {

    let result = []

    for (let item of arr) {
        if (item instanceof Array) {
            result = result.concat(flat(item))
        } else {
            result.push(item)
        }
    }

    return result
}

// console.log(flat([3,3,[3,6,7,[9,"aaaa"]],5,6,{a:2}]))


function flat2(arr, s) {
    let set = s || new Set()

    for(let i of arr) {
        if(i instanceof Array) {
            flat2(i, set)
        } else {
            set.add(i)
        }
    }
    return [...set].sort((a, b) => a - b)
}
let arr = [
    1, 3,
    [5, 3, 6],
    [1, 6, 9, [2, 8, [10]]]
]
console.log(flat2(arr))

console.log(arr.flat(Infinity))