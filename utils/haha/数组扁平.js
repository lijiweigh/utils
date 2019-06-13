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

console.log(flat([3,3,[3,6,7,[9,"aaaa"]],5,6,{a:2}]))


